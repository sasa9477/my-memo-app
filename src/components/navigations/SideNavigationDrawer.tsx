import { Box, Drawer, List, ListItem, ListItemText, styled, Tab, Tabs } from "@mui/material"

const sideNavigationWidth = 180

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

type SideNavigationDrawerProps = {
  transitionHomePage: () => void,
  transitionProfilePage: () => void
}

const SideNavigationDrawer: React.FC<SideNavigationDrawerProps> = ({ transitionHomePage, transitionProfilePage }): JSX.Element => {

  const handleMemoButtonClick = () => {
    transitionHomePage()
  }

  const handleProfileButtonClick = () => {
    transitionProfilePage()
  }

  return (
    <SideBarBase>
      <StyledDrawer
        variant='permanent'
        open>
        <List>
          <ListItem
            button
            component='a'
            onClick={handleMemoButtonClick}>
            <ListItemText primary='メモ' />
          </ListItem>
          <ListItem
            button
            component='a'
            onClick={handleProfileButtonClick}>
            <ListItemText primary='アカウント' />
          </ListItem>
        </List>
      </StyledDrawer>
    </SideBarBase>
  )
}

export default SideNavigationDrawer