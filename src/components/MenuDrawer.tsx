import { AppBar, Box, Drawer, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Toolbar } from "@mui/material"
import { default as NextLink } from "next/link"
import { useState } from "react"
import { AccountCircleIcon } from "./icons/AccountCircleIcon"
import { EditIcon } from "./icons/EditIcon"
import { InfoIcon } from "./icons/InfoIcon"

type MenuDrawerProps = {
}

const MenuDrawer: React.FC<MenuDrawerProps> = (): JSX.Element => {
  const [ openMenu, setOpenMenu ] = useState(false)

  return (
    <Drawer
    anchor="bottom"
    open={openMenu}
    onClose={() => setOpenMenu(false)}>
    <MenuList>
      <NextLink href={'/'} passHref>
        <MenuItem key="index-icon-button" onClick={() => setOpenMenu(false)}>
          <ListItemIcon>
            <EditIcon/>
          </ListItemIcon>
          <ListItemText>
            メモ
          </ListItemText>
        </MenuItem>
      </NextLink>
      <NextLink href={'/profile'} passHref>
        <MenuItem key="profile-icon-button" onClick={() => setOpenMenu(false)}>
          <ListItemIcon>
            <AccountCircleIcon/>
          </ListItemIcon>
          <ListItemText>
            プロフィール
          </ListItemText>
        </MenuItem>
      </NextLink>
    </MenuList>
  </Drawer>
  )
}

export default MenuDrawer