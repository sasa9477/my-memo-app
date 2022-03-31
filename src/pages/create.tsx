import { Box, Button, InputBase, Toolbar } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'
import { SendIcon } from '../components/icons/SendIcon'
import MemoArea from '../components/MemoArea'

const CreatePage: NextPage = () => {
  return (
    // TODO: click => focus input area
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height:theme => `calc(100vh - ${theme.spacing(2)})`, }}>
      <InputBase
        fullWidth
        multiline
        autoFocus
        placeholder='メモを書く'
        inputProps={{ spellCheck: false }}/>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href={'/'} passHref><Button>キャンセル</Button></Link>
        <Link href={'/'} passHref><Button variant='contained' endIcon={<SendIcon/>}>登録</Button></Link>
      </Box>
    </Box>
  )
}

export default CreatePage
