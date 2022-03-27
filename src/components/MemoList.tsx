import { Box, Input, List, ListItem, ListItemText, ListSubheader, styled, Toolbar, Typography } from "@mui/material"
import { Memo } from "../apis/@types"
import loadMemos, { loadGroupedMemos } from "./MemoMock"

type MemoListProps = {
}

const MemoList: React.FC<MemoListProps> = (): JSX.Element => {
  const memos = loadGroupedMemos()

  const MemoListBase = styled(List)(({theme}) => ({
    flexGrow: 1,
    overflowY: 'scroll',
    width: '100%',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.mixins.toolbar.minHeight
    }
  }))

  const TimeTypography = styled(Typography)({
    fontSize: '0.8em',
    color: 'gray'
  })

  return (
    <MemoListBase
      subheader={<ListItem/>}>
      {memos.map(memoList => (
        <ListItem key={`list-${memoList[0].date}`}>
          <List disablePadding>
            <ListSubheader disableGutters>
              {memoList[0].date}
            </ListSubheader>
            {memoList.map(memo => (
              <ListItem key={memo.id} disablePadding>
                <ListItemText
                  primary={
                    <TimeTypography>{memo.time}</TimeTypography>
                  }
                  secondary={
                    <Input value={memo.content}/>
                  }
                  disableTypography/>
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </MemoListBase>
  )
}

export default MemoList