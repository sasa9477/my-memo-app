import { alpha, Box, Icon, IconButton, InputBase, Paper, styled, ToggleButton } from "@mui/material"
import { ChangeEvent, useRef, useState, KeyboardEvent, useEffect, useCallback, useMemo } from "react"
import { SearchQuery } from "../apis/@types"
import apiClient from "../lib/apiClient"
import { BackspaceIcon } from "./icons/BackspaceIcon"
import { BookmarkBorderIcon } from "./icons/BookmarkBorderIcon"
import { BookmarkIcon } from "./icons/BookmarkIcon"
import { CheckCircleIcon } from "./icons/CheckCircleIcon"
import { SearchIcon } from "./icons/SearchIcon"

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

const CheckCircleIconButton = styled(IconButton)(({ theme }) => ({
  color: 'inherit',
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

type SearchBarProps = {
}

const SearchBar: React.FC<SearchBarProps> = (): JSX.Element => {
  const [ keywords, setKeywords ] = useState('')
  const [ bookmarkSearch, setBookmarkSearch ] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    if(searchInputRef.current) {
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

  const searchRequestCallback = useCallback(async (searchQuery: SearchQuery) => {
    const res = await apiClient.memos.search.$get({ query: { searchQuery: searchQuery }})
    console.log(res)
  },[])

  useEffect(() => {
    (async () => {
      const searchQuery: SearchQuery = {
        keywords: keywords,
        bookmarkSearch: bookmarkSearch
      }

      await searchRequestCallback(searchQuery)
    })()
  }, [keywords, bookmarkSearch, searchRequestCallback])

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
        <SearchInputBase
          fullWidth
          inputProps={{ spellCheck: false }}
          placeholder='メモを検索する'
          inputRef={searchInputRef}
          onKeyDown={handleSearchInputKeydown}/>
        <BackspaceIconButton
          onClick={() => handleClearSearchInputs()}>
          <BackspaceIcon/>
        </BackspaceIconButton>
      </SearchArea>
      <CheckCircleIconButton
        onClick={() => handleSearch()}>
        <CheckCircleIcon/>
      </CheckCircleIconButton>
    </SearchBarBase>
  )
}

export default SearchBar