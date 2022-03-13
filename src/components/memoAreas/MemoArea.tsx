import { Box, List, ListItem, ListSubheader } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMemoApi } from '../../hooks/useMemoApi';
import MemoItem from '../../models/MemoItem';
import MemoItemsCollection from '../../models/MemoItemsCollection';
import InputMemo from './InputMemo';
import MemoContents from './MemoContents';
import SearchBar from './SearchBar';

const MemoArea = (): JSX.Element => {
  const { loadAllMemos, searchMemos } = useMemoApi()
  const [ memosGroupedByDate, setMemoItemsGroupedByDate ] = useState(new Map<string, MemoItem[]>())
  const endOfContentRef = useRef<HTMLDivElement>(null)

  const loadMemosRequest = async () => {
    const allMemos = await loadAllMemos()
    const memoItemsCollection = new MemoItemsCollection(allMemos.map(memo => new MemoItem(memo)))
    const groupedMemoItemsByDate = memoItemsCollection.groupMemoItemsByDate()
    setMemoItemsGroupedByDate(groupedMemoItemsByDate)
  }

  const handleSearch = useCallback(
    async (searchQuery: string, bookmarkSearch: boolean) => {
      const memos = await searchMemos(searchQuery, bookmarkSearch)
      const memoItemsCollection = new MemoItemsCollection(memos.map(memo => new MemoItem(memo)))
      const groupedMemoItemsByDate = memoItemsCollection.groupMemoItemsByDate()
      setMemoItemsGroupedByDate(groupedMemoItemsByDate)
    }, [])

  useEffect(() => {
    (async () => {
      await loadMemosRequest()
    })()
    endOfContentRef.current?.scrollIntoView()
  },[])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
      <SearchBar handleSearch={handleSearch}/>
      <List
      sx={{
        flexGrow: 1,
        marginY: '10px',
        overflowY: 'scroll',
        padding: 0
      }}>
      {(() => {
        const jsxElements = new Array<JSX.Element>()
        memosGroupedByDate.forEach((memoList, date) => {
          jsxElements.push(
            <ListItem key={date} sx={{ paddingX: 0 }}>
              <List>
                <ListSubheader>
                  {date}
                </ListSubheader>
                {memoList.map((memo) => (
                  <MemoContents
                    key={`item-${date}-${memo.id}`}
                    memo={memo}
                    loadMemosRequest={loadMemosRequest}
                  />
                ))}
              </List>
            </ListItem>
          )
        })
        return jsxElements
      })()}
      <div ref={endOfContentRef}/>
    </List>
      <InputMemo loadMemosRequest={loadMemosRequest}/>
    </Box>
  );
};

export default MemoArea;