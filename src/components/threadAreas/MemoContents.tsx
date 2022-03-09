import { IconButton, Input, ListItem, ListItemText, Stack, ToggleButton, Typography } from '@mui/material';
import { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Memo } from '../../api/@types';
import { useMemoApi } from '../../hooks/useMemoApi';
import { BookmarkBorderIcon, BookmarkIcon, DeleteIcon, EditIcon } from '../../icons/IconPack';
import MemoViewModel from '../../models/MemoViewModel';

type MemoContentsProps = {
  //memosGroupedByDate: Map<string, MemoViewModel[]>
  // handleEdit: (memo: MemoViewModel) => Promise<void>
  // handleDelete: (memoId: number) => Promise<void>
  memo: MemoViewModel
  loadMemosRequest: () => Promise<void>
}

const MemoContents:FC<MemoContentsProps> = ({ memo, loadMemosRequest }): JSX.Element => {
  const { updateMemo, deleteMemo } = useMemoApi()
  const [ isEditContent, setIsEditContent ] = useState(false)
  const [ isBookmarked, setIsBookmarked ] = useState(memo.isBookmarked)
  const inputRefObject = useRef<HTMLInputElement>(null)

  const handleEdit = async () => {
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
      }
    }
    setIsEditContent(isEditContent => !isEditContent)
  }

  const handleBookmark = async () => {
    setIsBookmarked(isBookmarked => !isBookmarked)
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

  const handleBookmarkButtonClick = useCallback(
    async () => {
      await handleBookmark()
    }, []
  )

  const handleDelete = useCallback(
    async (memoId: number) => {
      await deleteMemo(memoId)
      await loadMemosRequest()
    }, []
  )

  useEffect(() => {
    (async () => {
      memo.isBookmarked = isBookmarked
      const req: Memo = {
        id: memo.id,
        createdAt: memo.createdAt,
        updatedAt: memo.updatedAt,
        content: memo.content,
        isBookmarked: memo.isBookmarked
      }
      await updateMemo(req)
    })()
  }, [ isBookmarked ])

  useEffect(() => {
    if(inputRefObject.current) {
      inputRefObject.current.value = memo.content
    }
    setIsBookmarked(memo.isBookmarked)
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
          onChange={handleBookmarkButtonClick}>
          {isBookmarked
          ? <BookmarkIcon
              fontSize='small'/>
          : <BookmarkBorderIcon
              fontSize='small'/>}
        </ToggleButton>
        <ToggleButton
          value='editToggleButton'
          size='small'
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
      <Stack>
        <ListItemText
          primary={
            <Typography
              fontSize='0.9em'
              color='gray'>
              {memo.time}
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