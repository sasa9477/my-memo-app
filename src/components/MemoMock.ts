import { Memo } from "../apis/@types";

export default function loadMemos(): Memo[] {
  return [
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
      bookmarkFlag: true,
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
      bookmarkFlag: false,
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
      content: 'this is seven.',
      bookmarkFlag: false,
      createdDate: '3月29日(火)',
      createdTime: '22:45',
    },
    {
      id: 9,
      content: 'this is seven.',
      bookmarkFlag: false,
      createdDate: '3月29日(火)',
      createdTime: '22:50',
      updatedDatetime: '3月30日(水) 22:50'
    },
    {
      id: 10,
      content: 'this is seven.',
      bookmarkFlag: false,
      createdDate: '3月29日(火)',
      createdTime: '22:55',
    },
    {
      id: 11,
      content: 'this is seven.',
      bookmarkFlag: false,
      createdDate: '3月29日(火)',
      createdTime: '22:57',
    },
    {
      id: 12,
      content: 'this is seven.',
      bookmarkFlag: false,
      createdDate: '3月29日(火)',
      createdTime: '22:59',
    }
  ]
}

export function loadGroupedMemos(memos: Memo[]): Memo[][] {
  return memos.reduce((previous: Memo[][], current: Memo) => {
    const lastArray: Memo[] = previous[previous.length - 1] ?? []
    const firstItem: Memo = lastArray[0]
    if (previous.length === 0 || (firstItem && firstItem.createdDate !== current.createdDate)) {
      const newArray = [ current ]
      previous.push(newArray)
      return previous
    }

    lastArray.push(current)
    return previous
  }, [])
}