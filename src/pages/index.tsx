import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import SideBar from './components/sideBars/SideBar';
import ThreadAreaContainer from './components/threadAreas/ThreadAreaContainer';

const drawerWidth = 80;

const Index = (): JSX.Element => {
  const theme = useTheme()
  // const isShowSidebar = useMediaQuery(theme.breakpoints.up('sm'))
  // サイドバーを一旦非表示
  const isShowSidebar = false

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