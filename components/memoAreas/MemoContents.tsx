import { IconButton, Input, ListItem, ListItemText, Stack, ToggleButton, Typography } from '@mui/material';
import { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useMemoApi } from '../../hooks/useMemoApi';
import { BookmarkBorderIcon, BookmarkIcon, DeleteIcon, EditIcon } from '../../icons/IconPack';
import MemoItem from '../../models/MemoItem';

type Props = {
  memoItem: MemoItem
  loadMemosRequest: (isScrollEndOfContent?: boolean) => Promise<void>
}

const MemoContents:FC<Props> = ({ memoItem, loadMemosRequest }): JSX.Element => {
  const { updateMemo, deleteMemo } = useMemoApi()
  const [ isEditContent, setIsEditContent ] = useState(false)
  const [ isBookmarked, setIsBookmarked ] = useState(memoItem.bookmarkFlag)
  const [ content, setContent ] = useState(memoItem.content)
  const inputRefObject = useRef<HTMLInputElement>(null)

  const handleEdit = async () => {
    if (inputRefObject.current) {
      const inputValue = inputRefObject.current.value.trim().replace(/\n\n$/, '\n')
      setContent(inputValue)
    }
    setIsEditContent(editingContent => !editingContent)
  }

  const handleInputKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      if(e.ctrlKey && e.key === 'Enter') {
        await handleEdit()
      }
    }, []
  )

  const handleDelete = useCallback(
    async (memoId: number) => {
      await deleteMemo(memoId)
      loadMemosRequest()
    }, []
  )

  useEffect(() => {
    (async () => {
      if (content !== memoItem.content || isBookmarked !== memoItem.bookmarkFlag) {
        memoItem.content = content
        memoItem.bookmarkFlag = isBookmarked
        await updateMemo(memoItem.toMemo())
        await loadMemosRequest()
      }
    })()
  }, [ content, isBookmarked ])

  useEffect(() => {
    if(inputRefObject.current) {
      inputRefObject.current.value = memoItem.content
    }
  }, [])

  return (
    <ListItem
      alignItems='flex-start'
      sx={{ paddingX: '0.2em', paddingY: '0.5em' }}>
      <Stack
        sx={{
          marginRight: '0.5em'
        }}>
        <ToggleButton
          value='bookmarkToggleButton'
          size='small'
          onChange={() => setIsBookmarked(bookmarkFalg => !bookmarkFalg)}>
          {isBookmarked
          ? <BookmarkIcon
              fontSize='small'/>
          : <BookmarkBorderIcon
              fontSize='small'/>}
        </ToggleButton>
        <ToggleButton
          value='editToggleButton'
          size='small'
          onChange={() => setIsEditContent(isEditContent => !isEditContent)}>
          <EditIcon
            fontSize='small'/>
        </ToggleButton>
        <IconButton
          size='small'
          onClick={() => handleDelete(memoItem.id)}>
          <DeleteIcon
            fontSize='small'/>
        </IconButton>
      </Stack>
      <Stack>
        <ListItemText
          primary={
            <Typography
              fontSize='0.9em'
              color='gray'>
              {memoItem.time}
            </Typography>
          }/>
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
          onKeyDown={handleInputKeyDown}/>
      </Stack>
  </ListItem>
  )
}

export default MemoContents