import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useMemoApi } from '../../../hooks/useMemoApi';
import MemoViewModel from '../../../models/MemoViewModel';
import InputThreadMemo from './InputTheadMemo';
import SearchBar from './SearchBar';
import ThreadArea from './ThreadArea';

const ThreadAreaContainer = (): JSX.Element => {
  const { loadAllMemos, createMemo, searchMemos } = useMemoApi()
  const [ memosGroupedByDate, setMemosGroupedByDate ] = useState(new Map<string, MemoViewModel[]>())

  const groupMemosByDate = (memos: MemoViewModel[]): Map<string, MemoViewModel[]> => {
    return memos.reduce((mapList, currentValue) => {
        const memoList = mapList.get(currentValue.date) || []
        memoList.push(currentValue)
        mapList.set(currentValue.date, memoList)
        return mapList
      }, new Map<string, MemoViewModel[]>())
  }

  const loadMemosRequest = async () => {
    const loadedMemos = await loadAllMemos()
    const loadedMemoViewModels = loadedMemos.map(memo => new MemoViewModel(memo))
    const groupedMemosByDate = groupMemosByDate(loadedMemoViewModels)
    setMemosGroupedByDate(groupedMemosByDate)
  }

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      if (searchQuery) {
        const memos = await searchMemos(searchQuery)
        const memoViewModels = memos.map(memo => new MemoViewModel(memo))
        const groupedMemosByDate = groupMemosByDate(memoViewModels)
        setMemosGroupedByDate(groupedMemosByDate)
      } else {
        await loadMemosRequest()
      }
    }, [])

  useEffect(() => {
    (async () => {
      await loadMemosRequest()
    })()
  },[])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
      <SearchBar handleSearch={handleSearch}/>
      <ThreadArea loadMemosRequest={loadMemosRequest} memosGroupedByDate={memosGroupedByDate}/>
      <InputThreadMemo loadMemosRequest={loadMemosRequest}/>
    </Box>
  );
};

export default ThreadAreaContainer;