import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import CreateMemoMobilePage from '../components/memos/CreateMemoMobilePage'

const CreatePage: NextPage = () => {
  const router = useRouter()

  const transitionHomePage = () => {
    if (router.pathname !== '/') {
      router.push('/')
    }
  }

  return (
    <CreateMemoMobilePage
      transitionHomePage={transitionHomePage} />
  )
}

export default CreatePage
