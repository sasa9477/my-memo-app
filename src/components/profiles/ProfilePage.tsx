import { DefaultSession } from "next-auth"
import UserCard from "./UserCard"

type ProfilePageProps = {
  user: DefaultSession['user']
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }): JSX.Element => {
  return (
    <UserCard
      user={user} />
  )
}

export default ProfilePage