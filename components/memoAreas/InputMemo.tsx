import { Input, Paper } from '@mui/material';
import React, { FC, KeyboardEvent, useRef } from 'react';
import { useMemoApi } from '../../hooks/useMemoApi';

type Props = {
  loadMemosRequest: (isScrollEndOfContent?: boolean) => Promise<void>
  scrollEndOfContent: () => void
}

const InputMemo: FC<Props> = ({ loadMemosRequest, scrollEndOfContent }): JSX.Element => {
  const { createMemo } = useMemoApi()
  const inputRefObject = useRef<HTMLInputElement>(null)

  const handleSend = async () => {
    if (inputRefObject.current) {
      const content = inputRefObject.current.value.trim().replace(/\n\n$/, '\n')
      inputRefObject.current.value = ''
      await createMemo({
        content: content
      })
      await loadMemosRequest(true)
      scrollEndOfContent()
    }
  }

  const handleInputKeyDown = async (e: KeyboardEvent) => {
    if(e.ctrlKey && e.key === 'Enter') {
      await handleSend()
    }
  }

  return (
    <Paper
      elevation={1}
      sx={{
        padding: '0.5em',
        mb: '2px'
      }}>
      <Input
        fullWidth
        multiline
        minRows={2}
        maxRows={8}
        inputProps={{ spellCheck: false }}
        placeholder='メモを書く(Ctrl + Enter で送信)'
        autoFocus={true}
        inputRef={inputRefObject}
        onKeyDown={handleInputKeyDown}/>
      {/* <Box
        sx={{
          display: 'flex',
          // justifyContent: 'flex-end',
          // justifyContent: 'space-between',
        }}>
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
        <Box>
          <IconButton onClick={(handleSendIconButtonClick)}>
            <SendIcon/>
          </IconButton>
          <IconButton>
            <FileIcon/>
          </IconButton>
        </Box>
      </Box> */}
    </Paper>
  );
};

export default InputMemo;