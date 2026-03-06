const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});

async function inspect() {
    try {
        console.log('Checking constraints for auth_users, affiliate_payments, and affiliates...');
        const res = await pool.query(`
            SELECT
                i.relname as index_name,
                a.attname as column_name,
                ix.indisunique
            FROM
                pg_class t,
                pg_class i,
                pg_index ix,
                pg_attribute a
            WHERE
                t.oid = ix.indrelid
                AND i.oid = ix.indexrelid
                AND a.attrelid = t.oid
                AND a.attnum = ANY(ix.indkey)
                AND t.relkind = 'r'
                AND t.relname = 'affiliate_natural_profiles'
                AND ix.indisunique = true;
        `);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error during inspection:', err);
    } finally {
        await pool.end();
    }
}

inspect();
