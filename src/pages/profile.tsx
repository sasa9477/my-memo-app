import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import UserCard from "../components/profiles/UserCard";

const ProfilePage: NextPage = () => {
  const { data, status } = useSession();

  if (status === "loading")
  {
    return (
      <p>
        loading...
      </p>
    )
  }

  if (!data)
  {
    signIn()
    return null
  }

  return(
    <>
      <UserCard user={data.user}/>
    </>
  )
}

export default ProfilePage