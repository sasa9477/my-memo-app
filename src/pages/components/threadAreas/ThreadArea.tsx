import { List, ListItem, ListItemText, ListSubheader, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useMemoApi } from '../../../hooks/useMemoApi';
import MemoViewModel from '../../../models/MemoViewModel';

const ThreadArea = (): JSX.Element => {
  const { loadAllMemos } = useMemoApi()
  const [memos, setMemos] = useState(new Map<string, MemoViewModel[]>())
  const endOfContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    (async () => {
      const loadedMemos = await loadAllMemos()
      const groupedByDateList =
        loadedMemos
          .map(memo => new MemoViewModel(memo))
          .reduce((mapList, currentValue) => {
            const memoList = mapList.get(currentValue.date) || []
            memoList.push(currentValue)
            mapList.set(currentValue.date, memoList)
            return mapList
          }, new Map<string, MemoViewModel[]>())
      setMemos(groupedByDateList)

      endOfContentRef.current?.scrollIntoView()
    })()
  },[])

  return (
    <List
      sx={{
        flexGrow: 1,
        marginY: '10px',
        overflowY: 'scroll',
        padding: 0
      }}>
      {(() => {
        const jsxElements = new Array<JSX.Element>()
        memos.forEach((memoList, datetime) => {
          jsxElements.push(
            <ListItem key={datetime} sx={{ paddingX: 0 }}>
              <List>
                <ListSubheader sx={{ textAlign: 'center' }}>
                  {datetime}
                </ListSubheader>
                {memoList.map((memo) => (
                  <ListItem
                    key={`item-${datetime}-${memo.id}`}
                    sx={{ paddingX: '0.2em', paddingY: '0.5em' }}>
                  <ListItemText
                    primary={
                      <Typography
                        fontSize='0.8em'>
                        {memo.time}
                      </Typography>
                    }
                    secondary={
                      <Typography display="inline">
                        {memo.content.split("\n").map((line, key) => <span key={key}>{line}<br/></span>)}
                      </Typography>
                    }/>
                </ListItem>
                ))}
              </List>
            </ListItem>
          )
        })
        return jsxElements
      })()}
      <div ref={endOfContentRef}/>
    </List>
  )
}

export default ThreadArea