import pool from './config/db';

async function fix() {
    // 1. Get an affiliate ID
    const affRes = await pool.query('SELECT id FROM affiliates LIMIT 1');
    const affId = affRes.rows[0]?.id;
    
    if (affId) {
        console.log(`Linking cmartinez to affiliate ${affId}`);
        await pool.query("UPDATE auth_users SET affiliate_id = $1 WHERE username = 'cmartinez'", [affId]);
        console.log("✅ Done.");
    } else {
        console.log("No affiliates found to link.");
    }
    process.exit(0);
}

fix();
