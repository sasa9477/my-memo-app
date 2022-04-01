import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { SearchQuery } from "../apis/@types";
import MyAppBar from "../components/MyAppBar";
import UserCard from "../components/UserCard";

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

  const searchRequestCallback = async (searchQuery: SearchQuery) => {
  }

  return(
    <>
      <UserCard user={data.user}/>
      <MyAppBar
            searchRequestCallback={searchRequestCallback}/>
    </>
  )
}

export default ProfilePage