import { Box, List, ListItem, ListSubheader } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { SearchQuery } from '../../api/@types';
import { useMemoApi } from '../../hooks/useMemoApi';
import MemoItem from '../../models/MemoItem';
import MemoItemsCollection from '../../models/MemoItemsCollection';
import InputMemo from './InputMemo';
import MemoContents from './MemoContents';
import SearchBar from './SearchBar';

const MemoArea = (): JSX.Element => {
  const { searchMemos } = useMemoApi()
  const [ searchQuery, setSearchQuery ] = useState<SearchQuery>({
    keywords : '',
    bookmarkFlag: false
  })
  const [ memosGroupedByDate, setMemoItemsGroupedByDate ] = useState(new Map<string, MemoItem[]>())
  const endOfContentRef = useRef<HTMLDivElement>(null)

  const loadMemosRequest = async () => {
    const allMemos = await searchMemos(searchQuery)
    const memoItemsCollection = new MemoItemsCollection(allMemos.map(memo => new MemoItem(memo)))
    const groupedMemoItemsByDate = memoItemsCollection.groupMemoItemsByDate()
    setMemoItemsGroupedByDate(groupedMemoItemsByDate)
  }

  const handleChangeSearchQuery = (query: SearchQuery) => {
    if (query.keywords !== searchQuery.keywords
      || query.bookmarkFlag !== searchQuery.bookmarkFlag)
    {
      setSearchQuery({...query})
    }
  }

  const scrollEndOfContent = () => {
    endOfContentRef.current?.scrollIntoView()
  }

  useEffect(() => {
    (async () => {
//      console.log('called loadMemosRequest on cahnge searchQuery', searchQuery)
      await loadMemosRequest()
    })()
  }, [searchQuery])

  useEffect(() => {
    (async () => {
      await loadMemosRequest()
      scrollEndOfContent()
    })()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100vh'
      }}>
      <SearchBar handleChangeSearchQuery={handleChangeSearchQuery}/>
      <List
      sx={{
        flexGrow: 1,
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