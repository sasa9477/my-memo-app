import { Box, styled } from "@mui/material"
import { ReactNode, useCallback, useEffect, useState } from "react"
import BottomNavigationTab from "./navigations/AppBottomNavigation"
import SideNavigationDrawer from "./navigations/SideNavigationDrawer"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

const TopComponent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
}))

const SecondComponent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  overflow: 'auto',
}))

const MainComponentBox = styled(Box)(({ theme }) => ({
  flexGrow: 1
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
      <SecondComponent>
        <SideNavigationDrawer
          transitionHomePage={transitionHomePage}
          transitionProfilePage={transitionProfilePage} />
        <MainComponentBox>
          {children}
        </MainComponentBox>
      </SecondComponent>
      <BottomNavigationTab
        transitionHomePage={transitionHomePage}
        transitionProfilePage={transitionProfilePage} />
    </TopComponent>
  )
}

export default Layout