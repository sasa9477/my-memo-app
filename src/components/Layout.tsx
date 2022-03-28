import { Box, styled } from "@mui/material"
import { ReactNode, useCallback, useState } from "react"
import MyAppBar from "./MyAppBar"
import SideBar from "./SideBar"

const SIDEBAR_WIDTH = 128

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  const StyledBox = styled(Box)({
    display: 'flex'
  })

  const MainComponentBox = styled(Box)(({ theme }) => ({
    flexGrow: 1
  }))

 return (
   <StyledBox>
    <SideBar sideBarWidth={SIDEBAR_WIDTH}/>
    <MainComponentBox component='main'>
      {children}
      <MyAppBar/>
    </MainComponentBox>
   </StyledBox>
 )
}

export default Layout