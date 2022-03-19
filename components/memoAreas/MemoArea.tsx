import { Box, List, ListItem, ListSubheader, Toolbar } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SearchQuery } from '../../interfaces/@types';
import axiosApiClient from '../../lib/axiosApiClient';
import MemoItem from '../../models/MemoItem';
import MemoItemsCollection from '../../models/MemoItemsCollection';
import InputMemo from './InputMemo';
import MemoContents from './MemoContents';
import SearchBar from './SearchBar';

const MemoArea = (): JSX.Element => {
  const [ searchQuery, setSearchQuery ] = useState<SearchQuery>({
    keywords : '',
    bookmarkFlag: false
  })
  const [ memosGroupedByDate, setMemoItemsGroupedByDate ] = useState(new Map<string, MemoItem[]>())
  const endOfContentRef = useRef<HTMLDivElement>(null)

  // searchQueryが変化した場合に再計算した結果を返す
  const loadMemosRequest = useCallback(async () => {
    const allMemos = await axiosApiClient.memos.search.$get({ query: searchQuery })
    const memoItemsCollection = new MemoItemsCollection(allMemos.map(memo => new MemoItem(memo)))
    const groupedMemoItemsByDate = memoItemsCollection.groupMemoItemsByDate()
    setMemoItemsGroupedByDate(groupedMemoItemsByDate)
  }, [searchQuery])

  const scrollEndOfContent = useCallback(() => {
    endOfContentRef.current?.scrollIntoView()
  }, [endOfContentRef])

  useEffect(() => {
    (async () => {
      await loadMemosRequest()
      scrollEndOfContent()
    })()
  }, [loadMemosRequest, scrollEndOfContent])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
      <Toolbar sx={{ display: { sm: 'none' },  }}/>
      <SearchBar setSearchQuery={setSearchQuery}/>
      <List
      sx={{
        flexGrow: 1,
        overflowY: 'scroll',
        padding: 0,
        marginTop: '2px'
      }}>
      {(() => {
        const jsxElements = new Array<JSX.Element>()
        memosGroupedByDate.forEach((memoList, date) => {
          jsxElements.push(
            <ListItem key={date} sx={{ padding: 0 }}>
              <List sx={{ padding: 0 }}>
                <ListSubheader>
                  {date}
                </ListSubheader>
                {memoList.map((memo) => (
                  <MemoContents
                    key={`item-${date}-${memo.id}`}
                    memoItem={memo}
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
      <InputMemo
        loadMemosRequest={loadMemosRequest}
        scrollEndOfContent={scrollEndOfContent}/>
    </Box>
  )
}

export default MemoArea