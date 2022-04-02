import { Box, Container, Paper, styled, Toolbar } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Memo, SearchQuery } from '../../apis/@types'
import apiClient from '../../lib/apiClient'
import InputArea from './InputArea'
import MemoCreateFab from './MemoCreateFab'
import MemoList from './MemoList'
import SearchBar from './SearchBar'

const MemoAreaBase = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(1),
  position: 'relative',
}))

type MemoAreaProps = {
  transitionCreatePage: () => void
}

const MemoArea: React.FC<MemoAreaProps> = ({ transitionCreatePage }): JSX.Element => {
  const [memos, setMemos] = useState<Memo[][]>([])

  const searchRequestCallback = useCallback(async (searchQuery: SearchQuery) => {
    const res = await apiClient.memos.search.$get({ query: { searchQuery: searchQuery } })
    setMemos(res)
  }, [])

  return (
    <MemoAreaBase>
      <SearchBar
        searchRequestCallback={searchRequestCallback} />
      <MemoList
        memos={memos} />
      <InputArea />
      <MemoCreateFab
        transitionCreatePage={transitionCreatePage} />
    </MemoAreaBase>
  )
}

export default MemoArea