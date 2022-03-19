import { Divider, InputBase, Paper, ToggleButton } from '@mui/material';
import React, { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { BookmarkBorderIcon, BookmarkIcon, SearchIcon } from '../../icons/IconPack';
import { SearchQuery } from '../../interfaces/@types';

type Props = {
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>
}

const SearchBar: FC<Props> = ({ setSearchQuery }): JSX.Element => {
  const [ keywords, setKeywords ] = useState('')
  const [ bookmarkSearch, setBookmarkSearch ] = useState(false)
  const inputRefObject = useRef<HTMLInputElement>(null)

  const handleSearchBarKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      if(e.key === 'Enter') {
        setKeywords(inputRefObject.current.value)
      }
    }, []
  )

  useEffect(() => {
    setSearchQuery({
      keywords: keywords,
      bookmarkFlag: bookmarkSearch
    })
  }, [setSearchQuery, bookmarkSearch, keywords])

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
      <SearchIcon
        sx={{ color: 'gray' }}/>
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