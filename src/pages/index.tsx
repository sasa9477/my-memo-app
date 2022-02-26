import { format } from 'date-fns-tz';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Memo } from '../api/@types';
import { useMemoApi } from '../hooks/useMemoApi';

type FormValues = {
  content: string
}

const Index = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { loadAllMemo, createMemo, updateMemo, deleteMemo } = useMemoApi();
  const [ memos, setMemos ] = useState<Memo[]>([]);

  const handleCreate = useCallback(
    async (values: FormValues) => {
      await createMemo(values.content);

      const memos = await loadAllMemo();
      setMemos(memos);
    }, []);

  const handleUpdate = useCallback(
    async (memo: Memo) => {
      memo.content = 'update memo!';
      await updateMemo(memo);

      const memos = await loadAllMemo();
      setMemos(memos);
    }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteMemo(id);

      const memos = await loadAllMemo();
      setMemos(memos);
    }, []);

  useEffect(() => {
    (async () => {
      const loadedMemos = await loadAllMemo();
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
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Content</th>
            <th>IsBookmarked</th>
          </tr>
        </thead>
        <tbody>
          {memos.map((memo: Memo) => (
            <tr key={memo.id}>
              <td>{memo.id}</td>
              <td>{memo.createdAt ? format(new Date(memo.createdAt), 'yyyy-MM-dd HH:mm:ss') : null}</td>
              <td>{memo.updatedAt ? format(new Date(memo.updatedAt), 'yyyy-MM-dd HH:mm:ss') : null}</td>
              <td>{memo.content}</td>
              <td>{memo.isBookmarked ? 'True' : 'False'}</td>
              <td><input type="button" value="更新" onClick={() => handleUpdate(memo)}/></td>
              <td><input type="button" value="削除" onClick={() => handleDelete(memo.id!)}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Index