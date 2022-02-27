import React from 'react';
import { Box } from '@mui/material';
import SearchBar from './SearchBar';
import ThreadArea from './ThreadArea';
import InputThreadMemo from './InputTheadMemo';

const ThreadAreaContainer = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
      <SearchBar/>
      <ThreadArea/>
      <InputThreadMemo/>
    </Box>
  );
};

export default ThreadAreaContainer;