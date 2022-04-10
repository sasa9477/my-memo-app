import { Box, styled, Typography } from "@mui/material"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import SideNavigationDrawer from "./navigations/SideNavigationDrawer"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import MyAppBar from "./MyAppBar"

const sideNavigationDrawerWidth = 180

const TopComponent = styled(Box)(({ theme }) => ({
  display: 'flex'
}))

const MainComponentBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.mixins.toolbar.minHeight
  }
}))

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  const { status } = useSession({
    required: true
  })
  const router = useRouter()

  const transitionHomePage = () => {
    if (router.pathname !== '/') {
      router.push('/')
    }
  }

  const transitionProfilePage = () => {
    if (router.pathname !== '/profile') {
      router.push('/profile')
    }
  }

  useEffect(() => {
    router.prefetch('/')
    router.prefetch('/profile')
  }, [router])

  if (status === 'loading') {
    <p>Now Loading...</p>
  }

  return (
    <TopComponent>
      <MyAppBar
        sideNavigationDrawerWidth={sideNavigationDrawerWidth}
        transitionHomePage={transitionHomePage}
        transitionProfilePage={transitionProfilePage} />
      <SideNavigationDrawer
        sideNavigationDrawerWidth={sideNavigationDrawerWidth}
        transitionHomePage={transitionHomePage}
        transitionProfilePage={transitionProfilePage} />
      <MainComponentBox
        component={'main'}>
        {children}
      </MainComponentBox>
    </TopComponent>
  )
}

export default Layout