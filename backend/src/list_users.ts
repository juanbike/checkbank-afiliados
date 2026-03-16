import pool from './config/db';

async function list() {
    const res = await pool.query('SELECT username FROM auth_users');
    console.log(res.rows.map(r => r.username));
    process.exit(0);
}

list();
