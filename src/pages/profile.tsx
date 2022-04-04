import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import ProfilePage from "../components/profiles/ProfilePage";

const Page: NextPage = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <p>
        loading...
      </p>
    )
  }

  if (!data) {
    signIn()
    return null
  }

  return (
    <ProfilePage
      user={data.user} />
  )
}

export default Page