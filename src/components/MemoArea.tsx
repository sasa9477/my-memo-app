import { Box, Container, Paper, styled, Toolbar } from '@mui/material'
import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { Memo, SearchQuery } from '../apis/@types'
import useMediaSize from '../hooks/useMediaSize'
import apiClient from '../lib/apiClient'
import AppFab from './AppFab'
import InputArea from './InputArea'
import MemoList from './MemoList'
import MyAppBar from './MyAppBar'
import SearchBar from './SearchBar'

const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  height: `calc(100vh - ${theme.spacing(2)})`,
  margin: 0,
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

type MemoAreaProps = {
}

const MemoArea: React.FC<MemoAreaProps> = (): JSX.Element => {
  const { isMobileSize } = useMediaSize()
  const [ memos, setMemos ] = useState<Memo[][]>([])

  const searchRequestCallback = useCallback(async (searchQuery: SearchQuery) => {
    const res = await apiClient.memos.search.$get({ query: { searchQuery: searchQuery }})
    setMemos(res)
  },[])

  return (
    <StyledBox>
      <StyledPaper>
        <SearchBar
          searchRequestCallback={searchRequestCallback}/>
      </StyledPaper>
      <MemoList
        memos={memos}/>
      <InputArea/>
      <AppFab/>
      {(!isMobileSize)
      ? null
      : <MyAppBar
        searchRequestCallback={searchRequestCallback}/>}
    </StyledBox>
  )
}

export default MemoArea