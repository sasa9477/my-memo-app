import type { Memo } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ICreateMemoRequest, useMemoApi } from '../hooks/useMemoapi';

type FormValues = {
  content: string
}

const Index = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { create, loadAll } = useMemoApi();
  const [ memos, setMemos ] = useState<Memo[]>([]);
  const handleCreate = useCallback(
    async (values: FormValues) => {
      console.log(values);

      const req: ICreateMemoRequest = {
        content: values.content
      }

      await create(req);

      const memos = await loadAll();
      setMemos(memos);
    },
    []);

  useEffect(() => {
    (async () => {
      const loadedMemos = await loadAll();
      setMemos(loadedMemos);
    })();
  },[])

  return (
    <>
      <form onSubmit={handleSubmit(handleCreate)}>
          <textarea rows={10} { ...register("content", { required: true })}></textarea>
          {formState.errors.content && <span>Content is required.</span>}
          <input type="submit" value="新規登録"/>
      </form>
      {memos.map((data: Memo) => <div key={data.id}>{data.id}: {data.content}</div>)}
    </>
  )
}

export default Index