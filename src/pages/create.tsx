import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import InputMemoMobile from '../components/memos/InputMemoMobile'

const CreatePage: NextPage = () => {
  const router = useRouter()

  const transitionHomePage = () => {
    if (router.pathname !== '/') {
      router.push('/')
    }
  }

  return (
    <InputMemoMobile
      transitionHomePage={transitionHomePage} />
  )
}

export default CreatePage
