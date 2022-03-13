import { Box, Button } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import MemoArea from '../components/memoAreas/MemoArea';
import SideBar from '../components/sideBars/SideBar';

const drawerWidth = 80;

const Index = (): JSX.Element => {
  const {data: session } = useSession()
  // const isShowSidebar = useMediaQuery(theme.breakpoints.up('sm'))
  // サイドバーを一旦非表示
  const isShowSidebar = false

  if (process.env.NODE_ENV !== 'production' && session) {
    console.log(session)
  }

  if (!session) {
    return (
      <Box
        sx={{
          height: '97vh',
          display: 'flex'
        }}>
        <Button
          onClick={() => signIn()}>
            Sign In
        </Button>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        height: '97vh',
        display: 'flex'
      }}>
      { isShowSidebar ? <SideBar sideBarWidth={drawerWidth}/> : null }
      <MemoArea/>
    </Box>
  );
}

export default Index;