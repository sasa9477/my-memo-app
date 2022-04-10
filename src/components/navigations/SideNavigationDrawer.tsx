import { Box, Drawer, DrawerProps, List, ListItem, ListItemText, styled, Tab, Tabs } from "@mui/material"
import DrawerItems from "./DrawerItems"

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  display: 'block',
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box'
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
}))

type SideNavigationDrawerProps = {
  sideNavigationDrawerWidth: number,
  transitionHomePage: () => void,
  transitionProfilePage: () => void
}

const SideNavigationDrawer: React.FC<SideNavigationDrawerProps> = ({ sideNavigationDrawerWidth, transitionHomePage, transitionProfilePage }): JSX.Element => {
  return (
    <StyledDrawer
      variant='permanent'
      open
      sx={{
        width: sideNavigationDrawerWidth,
        '& .MuiDrawer-paper': {
          width: sideNavigationDrawerWidth
        }
      }}>
      <DrawerItems
        transitionHomePage={transitionHomePage}
        transitionProfilePage={transitionProfilePage} />
    </StyledDrawer>
  )
}

export default SideNavigationDrawer