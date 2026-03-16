import pool from './config/db';

async function check() {
    const res = await pool.query("SELECT username, length(username) as u_len, length(password) as p_len FROM auth_users WHERE username IN ('alopez', 'cmartinez', 'mgonzalez')");
    res.rows.forEach(r => {
        console.log(`User: [${r.username}] (len: ${r.u_len}), P_len: ${r.p_len}`);
    });
    process.exit(0);
}

check();
