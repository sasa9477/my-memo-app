import { NextPage } from 'next'
import { getRequestInstance } from "../modules/request";

const Page = (props: any) => {
  console.log(props);

  return (
    <div>
      {props.data.map((data: any, index: number) => <div key={data.id}>{data.id}番目のデータ: {data.name}</div>)}
    </div>
  )
}

export default Page

export async function getStaticProps(ctx: any) {
	const request = getRequestInstance(Boolean(ctx.req));
	const res = await request.get("data").then(res => res);
  console.log(res.data);
	return {
    props: {
      data: res.data.data
    }
  }
}