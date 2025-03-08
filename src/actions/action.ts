
'use server'
import { neon } from '@neondatabase/serverless';
import { State } from '@/types/types';

export async function createTable(prevState: State, formData: FormData) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql('CREATE TABLE pgcomments (id SERIAL PRIMARY KEY, comment TEXT, username TEXT)');
    return { message: 'Table created successfully' };
  } catch (error) {
    console.error('Error creating table:', error);
    return { message: 'Error creating table', error: error instanceof Error ? error.message : String(error) };
  }
}

export async function deleteTable(prevState: State, formData: FormData) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql('DROP TABLE pgcomments');
    return { message: 'Table deleted successfully' };
  } catch (error) {
    console.error('Error deleting table:', error);
    return { message: 'Error deleting table', error: error instanceof Error ? error.message : String(error) };
  }
}