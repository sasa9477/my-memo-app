import React from 'react';
import { Paper, InputBase, IconButton, Divider } from '@mui/material';
import { SearchIcon, BookmarkBorderIcon } from '../../icons/IconPack';

const SearchBar = (): JSX.Element => {
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
        placeholder='メモを検索する'/>
      <IconButton>
        <SearchIcon/>
      </IconButton>
    </Paper>
  )
};

export default SearchBar;