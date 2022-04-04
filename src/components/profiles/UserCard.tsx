import LogoutIcon from "@mui/icons-material/Logout"
import { Avatar, Box, Button, Card, CardActions, CardContent, styled, Typography } from "@mui/material"
import { DefaultSession } from "next-auth"
import { signOut } from "next-auth/react"
import React from "react"

const UserCardBase = styled(Card)(({ theme }) => ({
  margin: theme.spacing(1)
}))

const UserCardContent = styled(CardContent)({
  display: 'flex',
  alignItems: 'center'
})

type UserCardProps = {
  user: DefaultSession['user']
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  if (!user) return null

  return (
    <UserCardBase>
      <UserCardContent>
        <Avatar
          alt={user.name ?? ''}
          src={user.image ?? ''}
          sx={{ mr: 2 }} />
        <Box>
          <Typography variant='h6' component='div'>
            {user.name}
          </Typography>
          <Typography component='div'>
            {user.email}
          </Typography>
        </Box>
      </UserCardContent>
      <CardActions>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={() => signOut()}>
          サインアウト
        </Button>
      </CardActions>
    </UserCardBase>
  )
}

export default UserCard