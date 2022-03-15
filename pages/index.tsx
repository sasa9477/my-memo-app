import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
import MemoArea from '../components/memoAreas/MemoArea';
import SideBar from '../components/SideBar';
import { MenuIcon } from '../icons/IconPack';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

const sideBarWidth = 180

const Index = (): JSX.Element => {
  const [ mobileOpen, setMobileOpen ] = useState(false)

  const handleSideBarToggle = () => {
    setMobileOpen(mobileOpen => !mobileOpen)
  }

  return (
    <Box
      sx={{
        display: "flex"
      }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${sideBarWidth}px)`},
          ml: { sm: `${sideBarWidth}px`}
        }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open side bar'
            onClick={handleSideBarToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon/>
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            My Memo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ width: { sm: sideBarWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleSideBarToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: sideBarWidth
            }
          }}>
          <SideBar/>
        </Drawer>
        <Drawer
          variant='permanent'
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: sideBarWidth
            }
          }}>
          <SideBar/>
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width:{ sm: `calc(100% - ${sideBarWidth}px)`}
        }}>
        <MemoArea/>
      </Box>
    </Box>
  )
}

export default Index;