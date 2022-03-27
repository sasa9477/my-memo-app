import { Box, IconButton, Input, Paper, styled } from "@mui/material"
import { DescriptionIcon } from "./icons/DescriptionIcon"
import { SendIcon } from "./icons/SendIcon"

type InputAreaProps = {
}

const InputArea: React.FC<InputAreaProps> = (): JSX.Element => {
  const InputAreaBase = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }))

  const FunctionBox = styled(Box)({
    display: 'flex'
  })

 return (
   <InputAreaBase elevation={1}>
    <Input
      fullWidth
      multiline
      minRows={2}
      maxRows={8}
      inputProps={{ spellCheck: false }}
      placeholder='メモを書く(Ctrl + Enter で送信)'
      autoFocus={true}/>
    <FunctionBox>
    <IconButton>
      <SendIcon/>
    </IconButton>
    <IconButton>
      <DescriptionIcon/>
    </IconButton>
    </FunctionBox>
   </InputAreaBase>
 )
}

export default InputArea