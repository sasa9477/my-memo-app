import { Box, styled, Typography } from "@mui/material"
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
  const [vh, setVH] = useState(0)
  const [innerHeight, setInnerHeight] = useState(0)
  const [screenAvailHeight, setScreenAvailHeight] = useState(0)
  const [inputClassName, setInputClassName] = useState('')

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

  useEffect(() => {
    const resizeVH = () => {
      if (vh !== window.visualViewport.height) {
        setVH(window.visualViewport.height)
      }

      if (innerHeight !== window.innerHeight) {
        setInnerHeight(window.innerHeight)
      }

      if (screenAvailHeight !== window.screen.availHeight) {
        setScreenAvailHeight(window.screen.availHeight)
      }
    }

    resizeVH()

    window.addEventListener('resize', resizeVH)

    const inputs = document.getElementsByTagName('input')
    for (const inputElement of inputs) {
      inputElement.onfocus = () => {
        resizeVH()
        setInputClassName(inputElement.className)
      }
    }

    for (const textareaElement of document.getElementsByTagName('textarea')) {
      textareaElement.onfocus = () => {
        resizeVH()
        setInputClassName(textareaElement.className)
      }
    }


    return () => window.removeEventListener('resize', resizeVH)
  }, [vh, innerHeight, screenAvailHeight])

  if (status === 'loading') {
    <p>Now Loading...</p>
  }

  return (
    <TopComponent
      component={'main'}
      sx={{ height: vh }}>
      <SecondComponent>
        <SideNavigationDrawer
          transitionHomePage={transitionHomePage}
          transitionProfilePage={transitionProfilePage} />
        <Box sx={{ width: '220px' }}>
          <Typography>vh: {vh}px</Typography>
          <Typography>innerHeight: {innerHeight}px</Typography>
          <Typography>screenAvailHeight: {screenAvailHeight}px</Typography>
          <Typography>input class name : {inputClassName}</Typography>
        </Box>
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