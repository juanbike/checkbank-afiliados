const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'canela123$$',
  database: 'cb_database',
  port: 5432,
});

async function listUsers() {
    try {
        const res = await pool.query('SELECT username FROM auth_users');
        console.log("Usernames in DB:");
        res.rows.forEach(r => console.log(`- "${r.username}"`));
        await pool.end();
    } catch (err) {
        console.error(err);
    }
}

listUsers();
