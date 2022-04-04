import { alpha, Box, Button, Icon, IconButton, InputBase, Paper, styled, ToggleButton } from "@mui/material"
import { useRef, useState, KeyboardEvent, useEffect, useCallback, ChangeEventHandler, ChangeEvent } from "react"
import { SearchQuery } from "../../apis/@types"
import { BackspaceIcon } from "../icons/BackspaceIcon"
import { BookmarkBorderIcon } from "../icons/BookmarkBorderIcon"
import { BookmarkIcon } from "../icons/BookmarkIcon"
import { SearchIcon } from "../icons/SearchIcon"

const SearchBarBase = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: 0,
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
  marginRight: theme.spacing(1),
  color: 'inherit',
  backgroundColor: alpha(theme.palette.common.black, 0.05)
}))

const SearchIconWrapper = styled(Icon)(({ theme }) => ({
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: `0 ${theme.spacing(1)}`
}))

const SearchInputBase = styled(InputBase)({
  color: 'inherit',
  flexGrow: 1,
})

const BackspaceIconButton = styled(IconButton)(({ theme }) => ({
  color: 'inherit',
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

const SearchButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

type SearchBarProps = {
  searchQuery: SearchQuery,
  setSearchQueryCallback: (searchQuery: SearchQuery) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQueryCallback }): JSX.Element => {
  const [bookmarkSearch, setBookmarkSearch] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearch = useCallback(async () => {
    if (searchInputRef.current) {
      const inputKeywords = searchInputRef.current.value.trim()
      const searchQuery: SearchQuery = {
        keywords: inputKeywords,
        bookmarkSearch: bookmarkSearch
      }
      setSearchQueryCallback(searchQuery)
    }
  }, [bookmarkSearch, setSearchQueryCallback])

  const handleBookmarkSearchToggle = () => {
    setBookmarkSearch(bookmarkSearch => !bookmarkSearch)
  }

  const handleSearchInputChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    await handleSearch()
  }

  const handleBackspaceButtonClick = async () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = ''

      await handleSearch()
    }
  }

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value = searchQuery.keywords
    }
    setBookmarkSearch(searchQuery.bookmarkSearch)
  }, [searchQuery])

  useEffect(() => {
    (async () => {
      await handleSearch()
    })()
  }, [bookmarkSearch, handleSearch])

  return (
    <SearchBarBase>
      <StyledToggleButton
        value='bookmarkSerchToogleButton'
        onChange={handleBookmarkSearchToggle}
        size='small'>
        {bookmarkSearch ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </StyledToggleButton>
      <SearchArea>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <SearchInputBase
          fullWidth
          inputProps={{ spellCheck: false }}
          inputRef={searchInputRef}
          placeholder='メモを検索する'
          onChange={handleSearchInputChange} />
        <BackspaceIconButton
          onClick={handleBackspaceButtonClick}>
          <BackspaceIcon />
        </BackspaceIconButton>
      </SearchArea>
    </SearchBarBase>
  )
}

export default SearchBar