import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { route } from 'next/dist/server/router'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import MemoArea from '../components/memos/MemoArea'

const Home: NextPage = () => {
  const router = useRouter()

  const transitionCreatePage = () => {
    if (router.pathname !== '/create') {
      router.push('/create')
    }
  }

  useEffect(() => {
    router.prefetch('/create')
  }, [router])

  return (
    <MemoArea
      transitionCreatePage={transitionCreatePage} />
  )
}

export default Home
