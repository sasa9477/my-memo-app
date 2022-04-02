import { Box, Drawer, List, ListItem, ListItemText, styled, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import { AccountCircleIcon } from "../icons/AccountCircleIcon"
import { EditIcon } from "../icons/EditIcon"

const LeftJustifiedTab = styled(Tab)({
  justifyContent: 'start'
})

type SideNavigationDrawerProps = {
  sideNavigationWidth: number
}

const SideNavigationDrawer: React.FC<SideNavigationDrawerProps> = ({ sideNavigationWidth }): JSX.Element => {
  const SideBarBase = styled(Box)(({ theme }) => ({
    width: sideNavigationWidth,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  }))

  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    display: 'block',
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: sideNavigationWidth
    }
  }))

  return (
    <SideBarBase>
      <StyledDrawer
        variant='permanent'
        open>
        <List>
          <ListItem button component='a'>
            <ListItemText primary='メモ' />
          </ListItem>
        </List>
      </StyledDrawer>
    </SideBarBase>
  )
}

export default SideNavigationDrawer