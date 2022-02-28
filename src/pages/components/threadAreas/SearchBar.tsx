import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import React, { FC, KeyboardEvent, useCallback, useRef } from 'react';
import { BookmarkBorderIcon, SearchIcon } from '../../icons/IconPack';

type SearchBarProps = {
  handleSearch: (searchQuery: string) => Promise<void>
}

const SearchBar: FC<SearchBarProps> = ({ handleSearch }): JSX.Element => {
  const inputRefObject = useRef<HTMLInputElement>(null)

  const handleSearchBarKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      if(e.key === 'Enter') {
        if (inputRefObject.current) {
          handleSearch(inputRefObject.current.value)
        }
      }
    }, []
  )

  const handleSearchIconButtonClick = useCallback(
    async () => {
      if (inputRefObject.current) {
        handleSearch(inputRefObject.current.value)
      }
    }, []
  )

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <IconButton>
        {/* TODO: Toggle BookmarkBarIcon*/}
        <BookmarkBorderIcon/>
      </IconButton>
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