import { neon } from '@neondatabase/serverless';
import { CommentsTable } from '@/types/types';

export async function GET(request: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const result = await sql('SELECT * FROM pgcomments');
        return new Response(JSON.stringify(result as CommentsTable[]), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response('Error getting comments', { headers: { 'Content-Type': 'text/plain' } });
    }
}

export async function POST(request: Request) {

    const formData = await request.formData();
    const username = formData.get('username');
    const comment = formData.get('comment');

    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        await sql('INSERT INTO pgcomments (username, comment) VALUES ($1, $2)', [username, comment]);
        return new Response('Comment added', { headers: { 'Content-Type': 'text/plain' } });
    } catch (error) {
        return new Response('Error adding comment', { headers: { 'Content-Type': 'text/plain' } });
    }
}