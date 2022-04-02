import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { route } from 'next/dist/server/router'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import MemoPage from '../components/memos/MemoPage'

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
    <MemoPage
      transitionCreatePage={transitionCreatePage} />
  )
}

export default Home
