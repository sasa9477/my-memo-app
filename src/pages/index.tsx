import { Box, Container, Paper, styled, Toolbar } from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import AppFab from '../components/AppFab'
import { AddIcon } from '../components/icons/AddIcon'
import InputArea from '../components/InputArea'
import MemoList from '../components/MemoList'
import SearchBar from '../components/SearchBar'
import { HelloData } from './api/hello'

const Home: NextPage = () => {
  const [ johnDoe, setJohnDoe ] = useState('')

  useEffect(() => {
    const fetchHello = async () => {
      const { data, status } = await axios.get<HelloData>('http://localhost:3000/api/hello')
      console.log(data)
      setJohnDoe(data.name)
    }
    fetchHello()
  }, [setJohnDoe])

  const StyledPaper = styled(Paper)(({ theme }) => ({
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height:(theme) => `calc(100vh - ${theme.spacing(2)})`,
        margin: 0
      }}>
      <StyledPaper>
        <SearchBar/>
      </StyledPaper>
      <MemoList/>
      <InputArea/>
      <AppFab/>
    </Box>
  )
}

export default Home
