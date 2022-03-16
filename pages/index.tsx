import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import MemoArea from '../components/memoAreas/MemoArea';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}

const Index = (): JSX.Element => {
  return (
    <MemoArea/>
  )
}

export default Index