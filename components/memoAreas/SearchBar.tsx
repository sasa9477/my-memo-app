import { Divider, IconButton, InputBase, Paper, ToggleButton } from '@mui/material';
import React, { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { SearchQuery } from '../../api/@types';
import { BookmarkBorderIcon, BookmarkIcon, SearchIcon } from '../../icons/IconPack';

type Props = {
  handleChangeSearchQuery: (query: SearchQuery) => void
}

const SearchBar: FC<Props> = ({ handleChangeSearchQuery }): JSX.Element => {
  const [ keywords, setKeywords ] = useState('')
  const [ bookmarkSearch, setBookmarkSearch ] = useState(false)
  const inputRefObject = useRef<HTMLInputElement>(null)

  const changeSearchQuery = () => {
    if (inputRefObject.current) {
      setKeywords(inputRefObject.current.value)
    }
  }

  const handleSearchBarKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      if(e.key === 'Enter') {
        setKeywords(inputRefObject.current.value)
      }
    }, []
  )

  useEffect(() => {
    handleChangeSearchQuery({
      keywords: keywords,
      bookmarkFlag: bookmarkSearch
    })
  }, [bookmarkSearch, keywords])

  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <ToggleButton
          value='BookmarkSearchButton'
          onChange={() => setBookmarkSearch(bookmarkSearch => !bookmarkSearch)}>
          {bookmarkSearch
          ? <BookmarkIcon/>
          : <BookmarkBorderIcon/>}
        </ToggleButton>
      <Divider
        orientation='vertical'
        variant='middle'
        flexItem/>
      <IconButton
        onClick={() => changeSearchQuery()}>
        <SearchIcon/>
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        inputProps={{ spellCheck: false }}
        placeholder='メモを検索する'
        inputRef={inputRefObject}
        onKeyDown={handleSearchBarKeyDown}/>
    </Paper>
  )
};

export default SearchBar;