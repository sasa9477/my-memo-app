import { alpha, Box, Button, Icon, IconButton, InputBase, Paper, styled, ToggleButton } from "@mui/material"
import { useRef, useState, KeyboardEvent, useEffect, useCallback } from "react"
import { SearchQuery } from "../../apis/@types"
import useMediaSize from "../../hooks/useMediaSize"
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
  searchRequestCallback: (searchQuery: SearchQuery) => Promise<void>
}

const SearchBar: React.FC<SearchBarProps> = ({ searchRequestCallback }): JSX.Element => {
  const [keywords, setKeywords] = useState('')
  const [bookmarkSearch, setBookmarkSearch] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { isMobileSize } = useMediaSize()

  const handleSearch = () => {
    if (searchInputRef.current) {
      setKeywords(searchInputRef.current.value.trim())
    }
  }

  const handleSearchInputKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClearSearchInputs = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = ''
    }
  }

  const handleSearchButtonClick = () => {
    handleSearch()
  }

  useEffect(() => {
    (async () => {
      const searchQuery: SearchQuery = {
        keywords: keywords,
        bookmarkSearch: bookmarkSearch
      }
      await searchRequestCallback(searchQuery)
    })()
  }, [keywords, bookmarkSearch, searchRequestCallback])

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.placeholder = isMobileSize ? 'メモを検索する' : 'メモを検索する（Enterキーで検索）'
    }
  }, [isMobileSize])

  return (
    <SearchBarBase>
      <StyledToggleButton
        value='bookmarkSerchToogleButton'
        onChange={() => setBookmarkSearch(bookmarkSearch => !bookmarkSearch)}
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
          onKeyDown={handleSearchInputKeydown} />
        <BackspaceIconButton
          onClick={() => handleClearSearchInputs()}>
          <BackspaceIcon />
        </BackspaceIconButton>
      </SearchArea>
      <SearchButton
        variant='contained'
        onClick={handleSearchButtonClick}>
        検索
      </SearchButton>
    </SearchBarBase>
  )
}

export default SearchBar