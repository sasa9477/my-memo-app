import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import React, { FC, ReactNode, useState } from 'react';
import SideBar from '../components/SideBar';
import { MenuIcon } from '../icons/IconPack';

const sideBarWidth = 180

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }): JSX.Element => {
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
        <Toolbar/>
        {children}
      </Box>
    </Box>
  )
}

export default Layout