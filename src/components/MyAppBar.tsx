import { AppBar, Box, Drawer, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, styled, Toolbar } from "@mui/material"
import Link from "next/link"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { Memo, SearchQuery } from "../apis/@types"
import apiClient from "../lib/apiClient"
import { AccountCircleIcon } from "./icons/AccountCircleIcon"
import { EditIcon } from "./icons/EditIcon"
import { MenuIcon } from "./icons/MenuIcon"
import { SearchIcon } from "./icons/SearchIcon"
import SearchBar from "./SearchBar"

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  top: 'auto',
  bottom: 0
}))

const StyledToolbar = styled(Toolbar)({
  padding: '0 0.5em'
})

const StyledIconButton = styled(IconButton)({
  color: 'inherit'
})


type MyAppBarProps = {
  searchRequestCallback: (searchQuery: SearchQuery) => Promise<void>
}

const MyAppBar: React.FC<MyAppBarProps> = ({ searchRequestCallback }): JSX.Element => {
  const [ openMenu, setOpenMenu ] = useState(false)

  return (
    <>
      <StyledAppBar>
        <StyledToolbar>
          <StyledIconButton onClick={() => setOpenMenu(true)}>
            <MenuIcon/>
          </StyledIconButton>
          <SearchBar searchRequestCallback={searchRequestCallback}/>
        </StyledToolbar>
      </StyledAppBar>
      <Drawer
        anchor="bottom"
        open={openMenu}
        onClose={() => setOpenMenu(false)}>
        <MenuList>
          <Link href={'/'} passHref>
            <MenuItem key="index-icon-button" onClick={() => setOpenMenu(false)}>
              <ListItemIcon>
                <EditIcon/>
              </ListItemIcon>
              <ListItemText>
                メモ
              </ListItemText>
            </MenuItem>
          </Link>
          <Link href={'/profile'} passHref>
            <MenuItem key="profile-icon-button" onClick={() => setOpenMenu(false)}>
              <ListItemIcon>
                <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText>
                プロフィール
              </ListItemText>
            </MenuItem>
          </Link>
        </MenuList>
      </Drawer>
    </>
  )
}

export default MyAppBar