import { Box, Button, InputBase, styled } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import apiClient from "../../lib/apiClient"
import { SendIcon } from "../icons/SendIcon"

const CreateMemoMobilePageBase = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1)
}))

const StyledInput = styled(InputBase)({
  flexGrow: 1,
  alignItems: 'flex-start'
})

const FunctionBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between'
})

type CreateMemoMobilePageProps = {
  transitionHomePage: () => void
}

const CreateMemoMobilePage: React.FC<CreateMemoMobilePageProps> = ({ transitionHomePage }): JSX.Element => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [enableSendButton, setEnableSendButton] = useState(false)

  const handleInputChange = () => {
    if (inputRef.current) {
      if (inputRef.current.value.trim().length === 0) {
        setEnableSendButton(false)
      } else {
        setEnableSendButton(true)
      }
    }
  }

  const handleCancelClick = () => {
    transitionHomePage()
  }

  const handleSendClick = async () => {
    if (inputRef.current) {
      const content = inputRef.current.value.trim().removeConsecutiveNewlines()
      await apiClient.memos.create.$post({ body: { content: content } })

      transitionHomePage()
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <CreateMemoMobilePageBase>
      <FunctionBox>
        <Button
          onClick={handleCancelClick}>
          キャンセル
        </Button>
        <Button
          variant='contained'
          endIcon={<SendIcon />}
          disabled={!enableSendButton}
          onClick={handleSendClick}>
          登録
        </Button>
      </FunctionBox>
      <StyledInput
        fullWidth
        multiline
        placeholder='メモを書く'
        inputRef={inputRef}
        inputProps={{ spellCheck: false }}
        onChange={handleInputChange} />
    </CreateMemoMobilePageBase>
  )
}

export default CreateMemoMobilePage