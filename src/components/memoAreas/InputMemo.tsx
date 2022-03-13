import { Box, IconButton, Input, Paper } from '@mui/material';
import React, { FC, KeyboardEvent, useCallback, useRef } from 'react';
import { useMemoApi } from '../../hooks/useMemoApi';
import { FileIcon, SendIcon } from '../../icons/IconPack';

type Props = {
  loadMemosRequest: () => Promise<void>
}

const InputMemo: FC<Props> = ({ loadMemosRequest }): JSX.Element => {
  const { createMemo } = useMemoApi()
  const inputRefObject = useRef<HTMLInputElement>(null)

  const handleSend = async () => {
    if (inputRefObject.current) {
      const content = inputRefObject.current.value.trim().replace(/\n\n$/, '\n')
      inputRefObject.current.value = ''
      await createMemo(content)
      await loadMemosRequest()
    }
  }

  const handleInputKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      if(e.ctrlKey && e.key === 'Enter') {
        await handleSend()
      }
    }, []
  )

  const handleSendIconButtonClick = useCallback(
    async () => {
      await handleSend()
    }, []
  )

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
        autoFocus={true}
        inputRef={inputRefObject}
        onKeyDown={handleInputKeyDown}/>
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
          <IconButton onClick={handleSendIconButtonClick}>
            <SendIcon/>
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default InputMemo;