import { AppBar, Box, IconButton, styled, Toolbar } from "@mui/material"
import { AccountCircleIcon } from "./icons/AccountCircleIcon"
import { SearchIcon } from "./icons/SearchIcon"
import SearchBar from "./SearchBar"

type MyAppBarProps = {
}

const MyAppBar: React.FC<MyAppBarProps> = (): JSX.Element => {
  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }))

  const StyledToolbar = styled(Toolbar)({
    padding: '0 0.5em'
  })

  const StyledIconButton = styled(IconButton)({
    color: 'inherit'
  })

 return (
   <StyledAppBar>
     <StyledToolbar>
      <StyledIconButton>
        <AccountCircleIcon/>
      </StyledIconButton>
      <SearchBar/>
     </StyledToolbar>
   </StyledAppBar>
 )
}

export default MyAppBar