import { Box } from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import AppFab from '../components/AppFab'
import { AddIcon } from '../components/icons/AddIcon'
import InputArea from '../components/InputArea'
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

  return (
    <Box>
      <h1>Hello world!</h1>
      <div>{johnDoe}</div>
      <SearchBar/>
      <AppFab/>
      <InputArea/>

    </Box>
  )
}

export default Home
