import pool from './config/db';

async function check() {
    const res = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'auth_users' AND column_name = 'id'");
    console.log('Columns for auth_users:', res.rows);
    process.exit(0);
}

check();
