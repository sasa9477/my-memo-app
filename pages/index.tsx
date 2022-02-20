import type { Memo } from '@prisma/client';
import Axios from './Axios';
import RegisterForm, { RegisterFormProps } from './RegisterForm';
import { useEffect, useState } from 'react';

interface ILoadAllMemosRequest {
}

interface ILoadAllMemosResponse {
  memos: Memo[]
}

const loadAllMemos = async (): Promise<Memo[]> => {
  return await Axios.get("/load-all-memos").then(res => res.data);
}

const Page = (props: any) => {
  const [ memos, setMemos ] = useState<Memo[]>([]);

  useEffect(() => {
    const load = async () => {
      const loadedMemos = await loadAllMemos();
      setMemos(loadedMemos);
    }
    load();
  },[])

  return (
    <>
      <RegisterForm onSubmit={() => console.log('TODO: Renderer!')}/>
      {memos.map((data: Memo) => <div key={data.id}>{data.id}: {data.content}</div>)}
    </>
  )
}

export default Page