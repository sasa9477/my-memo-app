import { Box, IconButton, Input, Paper } from '@mui/material';
import React, { useCallback, useRef } from 'react';
import { useMemoApi } from '../../../hooks/useMemoApi';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FileIcon, SendIcon } from '../../icons/IconPack';

const InputThreadMemo = (): JSX.Element => {
  const { createMemo } = useMemoApi()
  const inputRefObject = useRef<HTMLInputElement>(null)

  const handleSend = useCallback(
    async () => {
      if (inputRefObject.current != null) {
        const content = inputRefObject.current.value
        await createMemo(content)
      }
    }, [])

  return (
    <Paper
      sx={{
        // padding bottom is 0, others 0.5em
        padding: '0.5em 0.5em 0 0.5em'
      }}
      elevation={2}>
      <Input
        fullWidth
        multiline
        minRows={2}
        maxRows={8}
        inputProps={{ spellCheck: false }}
        placeholder='メモを書く'
        inputRef={inputRefObject}/>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          // justifyContent: 'space-between',
        }}>
        {/*
        <Box>
          <IconButton>
            <FormatBoldIcon/>
          </IconButton>
          <IconButton>
            <FormatItalicIcon/>
          </IconButton>
          <IconButton>
            <StrikeThroughSIcon/>
          </IconButton>
          <IconButton>
            <CodeIcon/>
          </IconButton>
        </Box>
        */}
        <Box>
          <IconButton>
            <FileIcon/>
          </IconButton>
          <IconButton onClick={() => handleSend()}>
            <SendIcon/>
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default InputThreadMemo;