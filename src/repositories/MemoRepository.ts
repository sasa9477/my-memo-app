import { Memo, Prisma, PrismaClient } from "@prisma/client"
import { Memo as MemoDto, SearchQuery } from "../apis/@types"
import prismaApiClient from "../lib/prismaApiClient"
import { format } from "date-fns"
import ja from "date-fns/locale/ja"

export default class MemoRepository {

  private convertToMemoDto(memo: Memo): MemoDto {
    const memoDto: MemoDto = {
      id: memo.id,
      content: memo.content,
      bookmarkFlag: memo.bookmarkFlag,
      createdDate: format(memo.createdAt, 'MMMdo(E)', { locale: ja }),
      createdTime: format(memo.createdAt, 'HH:mm', { locale: ja }),
      updatedDatetime: memo.updatedAt ? format(memo.updatedAt, 'MMMdo(E) HH:mm', { locale : ja }) : undefined
    }
    return memoDto
  }

  private groupByCreatedDate(memos: Memo[]): MemoDto[][] {
    return  memos.reduce((previous: MemoDto[][], current: Memo) => {
      // convert Memo DTO
      const memoDto = this.convertToMemoDto(current)

      const lastArray = previous[previous.length - 1] ?? []
      const firstItem = lastArray[0]
      if (previous.length === 0 || (firstItem && firstItem.createdDate !== memoDto.createdDate)) {
        const newArray = [ memoDto ]
        previous.push(newArray)
        return previous
      }

      lastArray.push(memoDto)
      return previous
    }, [])
  }

  async searchMemo(searchQuery: SearchQuery, userEmail: string): Promise<MemoDto[][]> {
    let whereQuery: Prisma.MemoWhereInput[] = []

    if (searchQuery.keywords) {
      whereQuery = searchQuery.keywords
        .trim()
        .replace('　', ' ')
        .split(' ')
        .map(key => ({
          content: {
            contains: key,
            mode: 'insensitive' // ignore-case
          }
        }))
    }

    if (searchQuery.bookmarkSearch) {
      whereQuery.push({
        bookmarkFlag: true
      })
    }

    whereQuery.push({
      user: {
        email: userEmail
      }
    })

    const memos = await prisma.memo.findMany({
      where: {
        AND: whereQuery,
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return this.groupByCreatedDate(memos)
  }

  async addMemo(content: string, userEmail: string): Promise<MemoDto> {
    const memo = await prismaApiClient.memo.create({
      data: {
        content: content,
        user: { connect: { email: userEmail }}
      },
    })

    return this.convertToMemoDto(memo)
  }

  async updateMemo(memoDto: MemoDto): Promise<MemoDto> {
    const memo = await prismaApiClient.memo.update({
      data: {
        content: memoDto.content,
        bookmarkFlag: memoDto.bookmarkFlag,
        updatedAt: new Date()
      },
      where: {
        id: memoDto.id
      }
    })

    return this.convertToMemoDto(memo)
  }

  async deleteMemo(memoId: number): Promise<void> {
    await prismaApiClient.memo.delete({
      where: {
        id: memoId
      }
    })
  }
}