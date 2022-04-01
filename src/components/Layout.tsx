import { Box, styled } from "@mui/material"
import { ReactNode, useCallback, useEffect, useState } from "react"
import useMediaSize from "../hooks/useMediaSize"
import MyAppBar from "./MyAppBar"
import SideBar from "./SideBar"

const SIDEBAR_WIDTH = 280

const StyledBox = styled(Box)({
  display: 'flex'
})

const MainComponentBox = styled(Box)(({ theme }) => ({
  flexGrow: 1
}))

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  const { isMobileSize } = useMediaSize()

  if (isMobileSize) {
    return (
      <>
        {children}
      </>
    )
  }

 return (
   <StyledBox>
    <SideBar sideBarWidth={SIDEBAR_WIDTH}/>
    <MainComponentBox component='main'>
      {children}
    </MainComponentBox>
   </StyledBox>
 )
}

export default Layout