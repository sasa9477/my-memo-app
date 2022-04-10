import { Box, styled, Typography } from "@mui/material"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import BottomNavigationTab from "./navigations/AppBottomNavigation"
import SideNavigationDrawer from "./navigations/SideNavigationDrawer"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"

const TopComponent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw'
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
  const scrollLockTargetRef = useRef<HTMLElement>()

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
    }

    resizeVH()

    const scrollLockOnInputsFocus = (ev: FocusEvent) => {
      const element = ev?.target as HTMLElement
      console.log('focus', element?.className)

      if (element) {
        scrollLockTargetRef.current = element
        disableBodyScroll(element)
        setTimeout(resizeVH, 300)
      }
    }

    const scrollUnlockOnInputsBlur = (ev: FocusEvent) => {
      const element = ev?.target as HTMLElement
      console.log('blur', element?.className)

      if (element) {
        scrollLockTargetRef.current = element
        enableBodyScroll(element)
        setTimeout(resizeVH, 300)
      }
    }

    setTimeout(() => {
      const inputs = document.getElementsByTagName('input')
      for (const inputElement of inputs) {
        inputElement.onfocus = scrollLockOnInputsFocus
        inputElement.onblur = scrollUnlockOnInputsBlur
      }

      const textareas = document.getElementsByTagName('textarea')
      for (const textareaElement of textareas) {
        textareaElement.onfocus = scrollLockOnInputsFocus
        textareaElement.onblur = scrollUnlockOnInputsBlur
      }
    }, 300)

    return () => clearAllBodyScrollLocks()
  }, [vh])

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
          <Typography>version: 1</Typography>
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