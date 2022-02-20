import { NextPage, GetStaticProps, GetStaticPathsContext } from 'next'
import type { Memo } from '@prisma/client';
import axios from 'axios';

const Page = (props: any) => {
  console.log("props", props);

  return (
    <div>
      {props.memos.map((data: any, index: number) => <div key={data.id}>{data.id}: {data.content}</div>)}
    </div>
  )
}

export default Page

interface ILoadAllMemosRequest {
}

interface ILoadAllMemosResponse {
  memos: Memo[]
}

export const getStaticProps: GetStaticProps = async (context) => {
	const memos = await axios.get<ILoadAllMemosResponse>("http://localhost:3000/api/memos").then(res => res.data);

  return {
    props: {
      memos: memos
    }
  }
}