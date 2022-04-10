import { List, ListItem, ListItemText } from "@mui/material"

type DrawerItemsProps = {
  transitionHomePage: () => void,
  transitionProfilePage: () => void,
  closeDrawer?: () => void
}

const DrawerItems: React.FC<DrawerItemsProps> = ({ transitionHomePage, transitionProfilePage, closeDrawer }): JSX.Element => {
  const handleMemoButtonClick = () => {
    if (closeDrawer) {
      closeDrawer()
    }

    transitionHomePage()
  }

  const handleProfileButtonClick = () => {
    if (closeDrawer) {
      closeDrawer()
    }

    transitionProfilePage()
  }

  return (
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
  )
}

export default DrawerItems