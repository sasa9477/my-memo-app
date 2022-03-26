import { ApprovalSharp } from "@mui/icons-material"
import { alpha, InputBase, Paper, styled, ToggleButton } from "@mui/material"
import { useState } from "react"
import { BookmarkBorderIcon } from "./icons/BookmarkBorderIcon"
import { BookmarkIcon } from "./icons/BookmarkIcon"
import { SearchIcon } from "./icons/SearchIcon"

type SearchBarProps = {
}

const SearchBar: React.FC<SearchBarProps> = (): JSX.Element => {
  const [ bookmarkSearch, setBookmarkSearch ] = useState(false)

  const SearchBase = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.02),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    marginLeft: theme.spacing(1),
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '80%',
    },
  }))

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }))

  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}>
      <ToggleButton
        value='bookmarkSerchToogleButton'
        onChange={() => setBookmarkSearch(bookmarkSearch => !bookmarkSearch)}>
        {bookmarkSearch ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
      </ToggleButton>
      <SearchBase>
        <SearchIconWrapper>
          <SearchIcon/>
        </SearchIconWrapper>
        <StyledInputBase
          inputProps={{ spellCheck: false}}
          placeholder='Search...'
        />
      </SearchBase>
    </Paper>
  )
}

export default SearchBar