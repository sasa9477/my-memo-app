import { Box, IconButton, Input, Paper } from '@mui/material';
import React, { FC, KeyboardEvent, useCallback, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FileIcon, SendIcon } from '../../icons/IconPack';

type InputThreadMemoProps = {
  handleSend: (content: string) => Promise<void>
}

const InputThreadMemo: FC<InputThreadMemoProps> = ({ handleSend }): JSX.Element => {
  const inputRefObject = useRef<HTMLInputElement>(null)

  const handleInputKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      if(e.ctrlKey && e.key === 'Enter') {
        if (inputRefObject.current) {
          handleSend(inputRefObject.current.value)
          inputRefObject.current.value = ''
        }
      }
    }, []
  )

  const handleSendIconButtonClick = useCallback(
    async () => {
      if (inputRefObject.current) {
        handleSend(inputRefObject.current.value)
        inputRefObject.current.value = ''
      }
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

export default InputThreadMemo;