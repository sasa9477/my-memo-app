import { Divider, IconButton, InputBase, Paper, ToggleButton } from '@mui/material';
import React, { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { BookmarkBorderIcon, BookmarkIcon, SearchIcon } from '../../icons/IconPack';

type SearchBarProps = {
  handleSearch: (searchQuery: string, bookmarkSearch: boolean) => Promise<void>
}

const SearchBar: FC<SearchBarProps> = ({ handleSearch }): JSX.Element => {
  const [ bookmarkSearch, setBookmarkSearch ] = useState(false)
  const inputRefObject = useRef<HTMLInputElement>(null)

  const handleBookmarkSearchButtonClick = useCallback(
    () => {
      setBookmarkSearch(bookmarkSearch => !bookmarkSearch)
    }, []
  )

  const handleSearchBarKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      if(e.key === 'Enter') {
        if (inputRefObject.current) {
          handleSearch(inputRefObject.current.value, bookmarkSearch)
        }
      }
    }, []
  )

  const handleSearchIconButtonClick = useCallback(
    async () => {
      if (inputRefObject.current) {
        handleSearch(inputRefObject.current.value, bookmarkSearch)
      }
    }, []
  )

  useEffect(() => {
    if (inputRefObject.current) {
      handleSearch(inputRefObject.current.value, bookmarkSearch)
    }
  }, [bookmarkSearch])

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <ToggleButton
          value='BookmarkSearchButton'
          onChange={handleBookmarkSearchButtonClick}>
          {bookmarkSearch
          ? <BookmarkIcon/>
          : <BookmarkBorderIcon/>}
        </ToggleButton>
      <Divider
        orientation='vertical'
        variant='middle'
        flexItem/>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        inputProps={{ spellCheck: false }}
        placeholder='メモを検索する'
        inputRef={inputRefObject}
        onKeyDown={handleSearchBarKeyDown}/>
      <IconButton
        onClick={handleSearchIconButtonClick}>
        <SearchIcon/>
      </IconButton>
    </Paper>
  )
};

export default SearchBar;