'use client'
import { useActionState, useState } from 'react'
import { createTable, deleteTable } from '@/actions/action';
import { State, CommentsTable } from '@/types/types';

const initialState = {
  message: '',
};

export default function Page() {
  const [stateCreate, formActionCreate, pendingCreate] = useActionState(createTable, initialState);
  const [stateDelete, formActionDelete, pendingDelete] = useActionState(deleteTable, initialState);
  const [TableValues, setTableValues] = useState<CommentsTable[]>([]);

  function onGetTable() {
    fetch('/api/comment-table')
      .then(response => response.json())
      .then(data => setTableValues(data));
  }

  function postComment(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch('/api/comment-table', {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen text-white'>
      <div className='flex justify-center items-center gap-8 mx-auto p-8 border border-white w-2/6'>
        <ActionForm state={stateCreate} formAction={formActionCreate} pending={pendingCreate} actionTypeName='Create' />
        <ActionForm state={stateDelete} formAction={formActionDelete} pending={pendingDelete} actionTypeName='Delete' />
      </div>
      <PostCommentComponent postComment={postComment} />  
      <GetTableComponent TableValues={TableValues} onGetTable={onGetTable} />
    </div>
  );
}

function ActionForm({ state, formAction, pending, actionTypeName }:
  { state: State, formAction: (payload: FormData) => void, pending: boolean, actionTypeName: string }) {
  return (
    <form
      className='p-4 border'
      action={formAction}>
      <button
        className='p-2 border rounded-md'
        disabled={pending}>{actionTypeName} Table</button>
      <p>{state.message}</p>
    </form>
  )
}

function PostCommentComponent({ postComment }: { postComment: (e: any) => void }) {
  return (
    <div className='flex justify-center items-center gap-8 mx-auto p-8 border border-white w-2/6'>
      <form className='flex flex-col gap-4 w-full'
        onSubmit={(e) => {
          postComment(e);
        }}>
        <input
          required
          name="username"
          type="text"
          placeholder="Username"
          className="p-2 border border-white rounded-md text-white"
        />
        <input
          required
          name="comment"
          type="text"
          placeholder="Comment"
          className="p-2 border border-white rounded-md text-white"
        />
        <button type="submit" className="p-2 border rounded-md">
          Add Comment
        </button>
      </form>
    </div>
  )
}

function GetTableComponent({ TableValues, onGetTable }: { TableValues: CommentsTable[], onGetTable: () => void }) {
  return (
    <div className='flex justify-center items-center gap-8 mx-auto p-8 border border-white w-2/6'>
      <button
        onClick={onGetTable}
        className='p-2 border rounded-md'>
        Get Table
      </button>
      {TableValues.length === 0 ?
        <p>No data</p> :
        <div>
          <h2>Comments</h2>
          <ul>
            {TableValues.map((table, index) => (
              <li key={index}>
                <p>Comment: {table.comment}</p>
                <p>Username: {table.username}</p>
              </li>
            ))}
          </ul>
        </div>}
    </div>
  )
}

