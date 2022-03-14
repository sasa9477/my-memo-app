import MemoItem from "./MemoItem";

export default class MemoItemsCollection {
  array: Array<MemoItem>

  constructor(array?: Array<MemoItem>) {
    this.array = array ? array : []
  }

  public groupMemoItemsByDate(): Map<string, MemoItem[]> {
    return this.array.reduce((mapList, currentValue) => {
      const memoList = mapList.get(currentValue.date) || []
      memoList.push(currentValue)
      mapList.set(currentValue.date, memoList)
      return mapList
    }, new Map<string, MemoItem[]>())
  }
}