'use client'
import { useActionState } from 'react'
import { createTable, deleteTable } from '@/actions/action';
import { State } from '@/types/types';

const initialState = {
  message: '',
};



export default function Page() {
  const [stateCreate, formActionCreate, pendingCreate] = useActionState(createTable, initialState);
  const [stateDelete, formActionDelete, pendingDelete] = useActionState(deleteTable, initialState);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex justify-center items-center gap-8 mx-auto p-8 border border-white w-2/6'>
        <ActionForm state={stateCreate} formAction={formActionCreate} pending={pendingCreate} actionTypeName='Create' />
        <ActionForm state={stateDelete} formAction={formActionDelete} pending={pendingDelete} actionTypeName='Delete' />
      </div>
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

