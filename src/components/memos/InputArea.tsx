import { Box, IconButton, Input, Paper, styled } from "@mui/material"
import { KeyboardEvent, useRef } from "react"
import apiClient from "../../lib/apiClient"
import { DescriptionIcon } from "../icons/DescriptionIcon"
import { SendIcon } from "../icons/SendIcon"


const InputAreaBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

const FunctionBox = styled(Box)({
  display: 'flex'
})

type InputAreaProps = {
}

const InputArea: React.FC<InputAreaProps> = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSend = async () => {
    if (inputRef.current) {
      const content = inputRef.current.value.trim().removeConsecutiveNewlines()
      inputRef.current.value = ''
      await apiClient.memos.create.$post({ body: { content: content } })
    }
  }

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      await handleSend()
    }
  }

  return (
    <InputAreaBase elevation={1}>
      <Input
        fullWidth
        multiline
        minRows={2}
        maxRows={8}
        inputProps={{ spellCheck: false }}
        placeholder='メモを書く(Ctrl + Enter で送信)'
        autoFocus={true}
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
      />
      <FunctionBox>
        <IconButton onClick={async () => await handleSend()}>
          <SendIcon />
        </IconButton>
        <IconButton>
          <DescriptionIcon />
        </IconButton>
      </FunctionBox>
    </InputAreaBase>
  )
}

export default InputArea