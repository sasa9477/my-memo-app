import { AppBar, Box, IconButton, styled, Toolbar } from "@mui/material"
import { AccountCircleIcon } from "./icons/AccountCircleIcon"
import { SearchIcon } from "./icons/SearchIcon"

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

  const StyledIconButton = styled(IconButton)({
    color: 'inherit'
  })

  const SpaceBox = styled(Box)({
    flexGrow: 1
  })

 return (
   <StyledAppBar>
     <Toolbar>
      <StyledIconButton>
        <AccountCircleIcon/>
      </StyledIconButton>
      <SpaceBox/>
      <StyledIconButton>
        <SearchIcon/>
      </StyledIconButton>
     </Toolbar>
   </StyledAppBar>
 )
}

export default MyAppBar