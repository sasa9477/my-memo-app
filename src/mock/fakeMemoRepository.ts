import { Memo } from "../apis/@types";
import { format } from "date-fns"
import ja from "date-fns/locale/ja"

let memos: Memo[] = [
  {
    id: 1,
    content: 'gaga',
    bookmarkFlag: false,
    createdDate: '3月27日(日)',
    createdTime: '22:21'
  },
  {
    id: 2,
    content: 'this is two.',
    bookmarkFlag: false,
    createdDate: '3月27日(日)',
    createdTime: '22:30'
  },
  {
    id: 3,
    content: 'this is three.',
    bookmarkFlag: false,
    createdDate: '3月28日(月)',
    createdTime: '22:21',
  },
  {
    id: 4,
    content: 'this is four.',
    bookmarkFlag: true,
    createdDate: '3月28日(月)',
    createdTime: '22:40',
  },
  {
    id: 5,
    content: 'this is five.',
    bookmarkFlag: false,
    createdDate: '3月29日(火)',
    createdTime: '22:21',
  },
  {
    id: 6,
    content: 'this is six.',
    bookmarkFlag: true,
    createdDate: '3月29日(火)',
    createdTime: '22:30',
  },
  {
    id: 7,
    content: 'this is seven.',
    bookmarkFlag: false,
    createdDate: '3月29日(火)',
    createdTime: '22:40',
  },
  {
    id: 8,
    content: 'this is eight.',
    bookmarkFlag: false,
    createdDate: '3月29日(火)',
    createdTime: '22:45',
  },
  {
    id: 9,
    content: 'this is nine.',
    bookmarkFlag: false,
    createdDate: '3月29日(火)',
    createdTime: '22:50',
    updatedDatetime: '3月30日(水) 22:50'
  },
  {
    id: 10,
    content: 'this is ten.',
    bookmarkFlag: false,
    createdDate: '3月29日(火)',
    createdTime: '22:55',
  },
  {
    id: 11,
    content: 'this is eleven.',
    bookmarkFlag: false,
    createdDate: '3月29日(火)',
    createdTime: '22:57',
  },
  {
    id: 12,
    content: 'this is twelve.',
    bookmarkFlag: false,
    createdDate: '3月29日(火)',
    createdTime: '22:59',
  },
  {
    id: 13,
    content: 'this is thirteen.',
    bookmarkFlag: false,
    createdDate: '3月29日(火)',
    createdTime: '23:01',
  },
  {
    id: 14,
    content: 'this is fourteen.',
    bookmarkFlag: false,
    createdDate: '3月29日(火)',
    createdTime: '23:10',
  },
  {
    id: 15,
    content: 'this is fifteen.',
    bookmarkFlag: false,
    createdDate: '3月29日(火)',
    createdTime: '23:20',
  }
]

const loadAllMemos = (): Memo[] => {
  return memos.sort((a, b) => a.id - b.id);
}

const addMemo = (content: string): Memo => {
  const memoHasMaxId = memos.reduceRight((previous, current) => previous.id > current.id ? previous : current)
  const memo: Memo = {
    id: memoHasMaxId.id + 1,
    content: content,
    bookmarkFlag: false,
    createdDate: format(new Date(), 'MMMdo(E)', { locale: ja }),
    createdTime: format(new Date(), 'HH:mm', { locale: ja })
  }

  memos.push(memo)
  return memo
}

const updateMemo = (memo: Memo): Memo | undefined => {
  const updatedMemo = memos.find((value) => value.id === memo.id)
  if (updatedMemo) {
    updatedMemo.content = memo.content
    updatedMemo.bookmarkFlag = memo.bookmarkFlag
    updatedMemo.updatedDatetime = format(new Date(), 'MMMdo(E) HH:mm', { locale : ja })

    deleteMemo(memo.id)
    memos.push(updatedMemo)
    return updatedMemo
  }
  return undefined
}

const deleteMemo = (memoId: number) => {
  memos = memos.filter(memo => memo.id !== memoId)
}

export {
  loadAllMemos,
  addMemo,
  updateMemo,
  deleteMemo
}