import { IconButton, Input, ListItem, ListItemText, Stack, ToggleButton, Typography } from '@mui/material';
import { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Memo } from '../../../api/@types';
import { useMemoApi } from '../../../hooks/useMemoApi';
import MemoViewModel from '../../../models/MemoViewModel';
import { DeleteIcon, EditIcon } from '../../icons/IconPack';

type MemoContentsProps = {
  //memosGroupedByDate: Map<string, MemoViewModel[]>
  // handleEdit: (memo: MemoViewModel) => Promise<void>
  // handleDelete: (memoId: number) => Promise<void>
  memo: MemoViewModel
  loadMemosRequest: () => Promise<void>
}

const MemoContents:FC<MemoContentsProps> = ({ memo, loadMemosRequest }): JSX.Element => {
  const { updateMemo, deleteMemo } = useMemoApi()
  const inputRefObject = useRef<HTMLInputElement>(null)
  const [ isEditContent, SetIsEditContent ] = useState(false)

  const handleEdit = async () => {
    console.log('isEditContent', isEditContent)

    if (inputRefObject.current) {
      const inputValue = inputRefObject.current?.value.trim().replace(/\n\n$/, '\n')
      inputRefObject.current.value = inputValue
      if (inputValue !== memo.content) {
        memo.content = inputValue
        const req: Memo = {
          id: memo.id,
          createdAt: memo.createdAt,
          updatedAt: memo.updatedAt,
          content: memo.content,
          isBookmarked: memo.isBookmarked
        }
        await updateMemo(req)
        await loadMemosRequest()
      }
    }
    SetIsEditContent(isEditContent => !isEditContent)
  }

  const handleInputKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      if(e.ctrlKey && e.key === 'Enter') {
        await handleEdit()
      }
    }, []
  )

  const handleEditButtonClick = useCallback(
    async () => {
      await handleEdit()
    }, []
  )

  const handleDelete = useCallback(
    async (memoId: number) => {
      await deleteMemo(memoId)
      await loadMemosRequest()
    }, []
  )

  useEffect(() => {
    if(inputRefObject.current) {
      inputRefObject.current.value = memo.content
    }
  }, [])

  return (
    <ListItem
      alignItems='flex-start'
      sx={{ paddingX: '0.2em', paddingY: '0.5em' }}>
      <Stack
        sx={{
          marginX: '0.2em'
        }}>
        <ToggleButton
          value='editToggleButton'
          size='small'
          disableRipple={true}
          selected={isEditContent}
          onChange={handleEditButtonClick}>
          <EditIcon
            fontSize='small'/>
        </ToggleButton>
        <IconButton
          size='small'
          onClick={() => handleDelete(memo.id)}>
          <DeleteIcon
            fontSize='small'/>
        </IconButton>
      </Stack>
      <ListItemText
        primary={
          <Typography
            fontSize='0.9em'
            color='gray'>
            {memo.time}
          </Typography>
        }
        secondary={
          <Input
            inputRef={inputRefObject}
            fullWidth
            multiline
            autoComplete='off'
            size='small'
            margin='none'
            disableUnderline={!isEditContent}
            inputProps={{
              readOnly: !isEditContent
            }}
            onKeyDown={handleInputKeyDown}
          />
        }/>
  </ListItem>
  )
}

export default MemoContents