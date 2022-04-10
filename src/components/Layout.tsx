import { Box, styled, Typography } from "@mui/material"
import { ReactNode, useCallback, useEffect, useState } from "react"
import BottomNavigationTab from "./navigations/AppBottomNavigation"
import SideNavigationDrawer from "./navigations/SideNavigationDrawer"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

const TopComponent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '-webkit-fill-available',
  width: '100vw',
  overflow: 'hidden'
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
    }

    resizeVH()

    // window.addEventListener('resize', resizeVH)
    window.visualViewport.addEventListener('resize', resizeVH)

    // const resizeOnInputsFocus = (ev: FocusEvent) => {
    //   const element = ev?.target as HTMLElement
    //   console.log(element?.className)

    //   if (element && element.className !== inputClassName) {
    //     setInputClassName(element.className)
    //   }

    //   setTimeout(resizeVH, 1000)
    // }

    // setTimeout(() => {
    //   const inputs = document.getElementsByTagName('input')
    //   for (const inputElement of inputs) {
    //     inputElement.onfocus = resizeOnInputsFocus
    //   }

    //   const textareas = document.getElementsByTagName('textarea')
    //   for (const textareaElement of textareas) {
    //     textareaElement.onfocus = resizeOnInputsFocus
    //   }
    // }, 300)

    return () => window.visualViewport.removeEventListener('resize', resizeVH)
  }, [vh, inputClassName])

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