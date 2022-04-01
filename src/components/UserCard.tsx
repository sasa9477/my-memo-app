import LogoutIcon from "@mui/icons-material/Logout"
import { Avatar, Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { DefaultSession } from "next-auth"
import { signOut } from "next-auth/react"
import React from "react"

type UserCardProps = {
  user: DefaultSession['user']
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  if (!user) return null

  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt={user.name ?? ''}
          src={user.image ?? ''}
          sx={{ mr: 2 }}/>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' component='div'>
            {user.name}
          </Typography>
          <Typography component='div'>
            {user.email}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="outlined" startIcon={<LogoutIcon/>}  onClick={() => signOut()}>
          Sign Out
        </Button>
      </CardActions>
    </Card>
  )
}

export default UserCard