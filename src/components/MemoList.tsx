import { Box, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, styled, TextField, ToggleButton, Toolbar, Typography } from "@mui/material"
import useMediaSize from "../hooks/useMediaSize"
import { BookmarkBorderIcon } from "./icons/BookmarkBorderIcon"
import { BookmarkIcon } from "./icons/BookmarkIcon"
import { DeleteIcon } from "./icons/DeleteIcon"
import { loadGroupedMemos } from "./MemoMock"

type MemoListProps = {
}

const MemoList: React.FC<MemoListProps> = (): JSX.Element => {
  const { isMobileSize } = useMediaSize()
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

  const ItemList = styled(List)({
    width: '100%',
  })

  const MemoTextField = styled(TextField)(({ theme }) => ({
    margin: `0 ${theme.spacing(1)}`
  }))

  return (
    <MemoListBase
      dense
      subheader={<ListItem/>}>
      {memos.map(memoList => (
        <ListItem key={`list-${memoList[0].createdDate}`} disablePadding>
          <ItemList disablePadding>
            <ListSubheader disableGutters>
              {memoList[0].createdDate}
            </ListSubheader>
            {memoList.map(memo => (
              <ListItem key={memo.id} disablePadding>
                <IconButton size="small">
                  <BookmarkBorderIcon/>
                </IconButton>
                <MemoTextField
                  variant="standard"
                  fullWidth
                  multiline
                  label={memo.updatedDatetime ? `${memo.createdTime} ( ${memo.updatedDatetime} 更新 )` : memo.createdTime}
                  value={memo.content}
                  InputProps = {{
                    disableUnderline: true,
                    endAdornment: (!isMobileSize) ? null :
                      <InputAdornment position='end'>
                      <IconButton><DeleteIcon/></IconButton>
                      </InputAdornment>
                  }}/>
              </ListItem>
            ))}
          </ItemList>
        </ListItem>
      ))}
    </MemoListBase>
  )
}

export default MemoList