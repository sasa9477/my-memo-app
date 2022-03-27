import { Memo } from "../apis/@types";

export default function loadMemos(): Memo[] {
  return [
    {
      id: 1,
      content: 'gaga',
      bookmarkFlag: false,
      date: '3月27日(日)',
      time: '22:21',
      createdAt: '2022/03/27 22:21:00',
      updatedAt: '2022/03/27 22:21:00'
    },
    {
      id: 2,
      content: 'this is two.',
      bookmarkFlag: false,
      date: '3月27日(日)',
      time: '22:30',
      createdAt: '2022/03/27 22:30:00',
      updatedAt: '2022/03/27 22:30:00'
    },
    {
      id: 3,
      content: 'this is three.',
      bookmarkFlag: true,
      date: '3月28日(月)',
      time: '22:21',
      createdAt: '2022/03/28 22:21:00',
      updatedAt: '2022/03/28 22:21:00'
    },
    {
      id: 4,
      content: 'this is four.',
      bookmarkFlag: true,
      date: '3月28日(月)',
      time: '22:40',
      createdAt: '2022/03/28 22:40:00',
      updatedAt: '2022/03/28 22:40:00'
    },
    {
      id: 5,
      content: 'this is five.',
      bookmarkFlag: false,
      date: '3月29日(火)',
      time: '22:21',
      createdAt: '2022/03/29 22:21:00',
      updatedAt: '2022/03/29 22:21:00'
    },
    {
      id: 6,
      content: 'this is six.',
      bookmarkFlag: false,
      date: '3月29日(火)',
      time: '22:30',
      createdAt: '2022/03/29 22:30:00',
      updatedAt: '2022/03/29 22:30:00'
    },
    {
      id: 7,
      content: 'this is seven.',
      bookmarkFlag: false,
      date: '3月29日(火)',
      time: '22:40',
      createdAt: '2022/03/29 22:40:00',
      updatedAt: '2022/03/29 22:40:00'
    },
    {
      id: 8,
      content: 'this is seven.',
      bookmarkFlag: false,
      date: '3月29日(火)',
      time: '22:45',
      createdAt: '2022/03/29 22:45:00',
      updatedAt: '2022/03/29 22:45:00'
    },
    {
      id: 9,
      content: 'this is seven.',
      bookmarkFlag: false,
      date: '3月29日(火)',
      time: '22:50',
      createdAt: '2022/03/29 22:50:00',
      updatedAt: '2022/03/29 22:50:00'
    },
    {
      id: 10,
      content: 'this is seven.',
      bookmarkFlag: false,
      date: '3月29日(火)',
      time: '22:55',
      createdAt: '2022/03/29 22:55:00',
      updatedAt: '2022/03/29 22:55:00'
    },
    {
      id: 11,
      content: 'this is seven.',
      bookmarkFlag: false,
      date: '3月29日(火)',
      time: '22:57',
      createdAt: '2022/03/29 22:57:00',
      updatedAt: '2022/03/29 22:57:00'
    },
    {
      id: 12,
      content: 'this is seven.',
      bookmarkFlag: false,
      date: '3月29日(火)',
      time: '22:59',
      createdAt: '2022/03/29 22:59:00',
      updatedAt: '2022/03/29 22:59:00'
    }
  ]
}

export function loadGroupedMemos(): Memo[][] {
  const memos = loadMemos()

  return memos.reduce((previous: Memo[][], current: Memo) => {
    const lastArray: Memo[] = previous[previous.length - 1] ?? []
    const firstItem: Memo = lastArray[0]
    if (previous.length === 0 || (firstItem && firstItem.date !== current.date)) {
      const newArray = [ current ]
      previous.push(newArray)
      return previous
    }

    lastArray.push(current)
    return previous
  }, [])
}