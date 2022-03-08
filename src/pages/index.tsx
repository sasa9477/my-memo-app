import { Box, Button } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import SideBar from './components/sideBars/SideBar';
import ThreadAreaContainer from './components/threadAreas/ThreadAreaContainer';

const drawerWidth = 80;

const Index = (): JSX.Element => {
  const {data: session } = useSession()
  // const isShowSidebar = useMediaQuery(theme.breakpoints.up('sm'))
  // サイドバーを一旦非表示
  const isShowSidebar = false

  if (!session) {
    return (
      <Button
        onClick={() => signIn()}>
          Sign In
      </Button>
    )
  }

  return (
    <Box
      sx={{
        height: '97vh',
        display: 'flex'
      }}>
      { isShowSidebar ? <SideBar sideBarWidth={drawerWidth}/> : null }
      <ThreadAreaContainer/>
    </Box>
  );
}

export default Index;