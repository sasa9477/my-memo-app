import { Box, Container, Paper, styled, Toolbar } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Memo, SearchQuery } from '../../apis/@types'
import apiClient from '../../lib/apiClient'
import valueEquals from '../../lib/valueEquals'
import InputArea from './InputArea'
import MemoCreateFab from './MemoCreateFab'
import MemoList from './MemoList'
import SearchBar from './SearchBar'

export type SearchRequest = (requestScrollEnd: boolean) => Promise<void>

export type SearchResult = {
  memos: Memo[][],
  scrollEndElement: boolean
}

const emptySearchQuery: SearchQuery = {
  keywords: '',
  bookmarkSearch: false
}

const MemoAreaBase = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(1),
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse'
  }
}))

type MemoPageProps = {
  transitionCreatePage: () => void
}

const MemoPage: React.FC<MemoPageProps> = ({ transitionCreatePage }): JSX.Element => {
  const [searchResult, setSearchResult] = useState<SearchResult>({
    memos: [],
    scrollEndElement: true
  })
  const [searchQuery, setSearchQuery] = useState<SearchQuery>(emptySearchQuery)

  const searchRequest: SearchRequest = useCallback(async (requestScrollEnd) => {
    const res = await apiClient.memos.search.$get({ query: { searchQuery: searchQuery } })
    setSearchResult({
      memos: res,
      scrollEndElement: requestScrollEnd
    })
  }, [searchQuery, setSearchResult])

  const setSearchQueryRequest = useCallback((newSearchQuery: SearchQuery) => {
    setSearchQuery(newSearchQuery)
  }, [])

  useEffect(() => {
    (async () => {
      await searchRequest(true)
    })()
  }, [searchQuery, searchRequest])

  return (
    <MemoAreaBase>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQueryCallback={setSearchQueryRequest} />
      <MemoList
        searchResult={searchResult}
        searchRequest={searchRequest} />
      <InputArea
        searchRequest={searchRequest} />
      <MemoCreateFab
        transitionCreatePage={transitionCreatePage} />

    </MemoAreaBase>
  )
}

export default MemoPage