import { alpha, Box, Icon, IconButton, InputBase, Paper, styled, ToggleButton } from "@mui/material"
import { useState } from "react"
import { BackspaceIcon } from "./icons/BackspaceIcon"
import { BookmarkBorderIcon } from "./icons/BookmarkBorderIcon"
import { BookmarkIcon } from "./icons/BookmarkIcon"
import { CheckCircleIcon } from "./icons/CheckCircleIcon"
import { SearchIcon } from "./icons/SearchIcon"

type SearchBarProps = {
}

const SearchBar: React.FC<SearchBarProps> = (): JSX.Element => {
  const [ bookmarkSearch, setBookmarkSearch ] = useState(false)

  const SearchBarBase = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    padding: theme.spacing(1)
  }))

  const StyledToggleButton = styled(ToggleButton)({
    color: 'inherit'
  })

  const SearchArea = styled(Box)(({ theme }) => ({
    borderRadius: 4,
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    marginLeft: theme.spacing(1),
    color: 'inherit',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    [theme.breakpoints.up('sm')]: {
      backgroundColor: alpha(theme.palette.common.black, 0.05)
    }
  }))

  const SearchIconWrapper = styled(Icon)(({ theme }) => ({
    color: 'inherit',
    margin: `0 ${theme.spacing(1)}`
  }))

  const StyledInputBase = styled(InputBase)({
    color: 'inherit',
    flexGrow: 1,
  })

  const BackspaceIconButton = styled(IconButton)(({ theme }) => ({
    color: 'inherit',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }))

  const CheckCircleIconButton = styled(IconButton)(({ theme }) => ({
    color: 'inherit',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }))

  return (
    <SearchBarBase>
      <StyledToggleButton
        value='bookmarkSerchToogleButton'
        onChange={() => setBookmarkSearch(bookmarkSearch => !bookmarkSearch)}
        size='small'>
        {bookmarkSearch ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
      </StyledToggleButton>
      <SearchArea>
        <SearchIconWrapper>
          <SearchIcon/>
        </SearchIconWrapper>
        <StyledInputBase/>
        <BackspaceIconButton>
          <BackspaceIcon/>
        </BackspaceIconButton>
      </SearchArea>
      <CheckCircleIconButton>
        <CheckCircleIcon/>
      </CheckCircleIconButton>
    </SearchBarBase>
  )
}

export default SearchBar