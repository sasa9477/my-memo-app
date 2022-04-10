import { AppBar, Drawer, IconButton, styled, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { MenuIcon } from "./icons/MenuIcon"
import DrawerItems from "./navigations/DrawerItems"

const AppBarBase = styled(AppBar)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  display: 'block',
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box'
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

type MyAppBarProps = {
  sideNavigationDrawerWidth: number,
  transitionHomePage: () => void,
  transitionProfilePage: () => void
}

const MyAppBar: React.FC<MyAppBarProps> = ({ sideNavigationDrawerWidth, transitionHomePage, transitionProfilePage }): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleDrawerOpen = () => {
    setMobileOpen(mobileOpen => !mobileOpen)
  }

  const closeDrawer = () => {
    setMobileOpen(false)
  }

  return (
    <>
      <AppBarBase>
        <Toolbar>
          <IconButton
            color='inherit'
            onClick={toggleDrawerOpen}
            size='small'
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon
              fontSize='small' />
          </IconButton>
          <Typography noWrap component='div'>
            My Memo App
          </Typography>
        </Toolbar>
      </AppBarBase>
      <StyledDrawer
        variant='temporary'
        open={mobileOpen}
        onClose={toggleDrawerOpen}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: sideNavigationDrawerWidth
          }
        }}>
        <DrawerItems
          transitionHomePage={transitionHomePage}
          transitionProfilePage={transitionProfilePage}
          closeDrawer={closeDrawer} />
      </StyledDrawer>
    </>
  )
}

export default MyAppBar