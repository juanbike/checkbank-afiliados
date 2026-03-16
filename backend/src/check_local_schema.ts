import pool from './config/db';

async function checkSchema() {
    console.log('--- Checking Local Database Schema ---');
    
    const tables = ['auth_users', 'affiliates', 'activity_logs'];
    
    for (const table of tables) {
        const res = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = '${table}' 
            ORDER BY ordinal_position
        `);
        console.log(`\nTable: ${table}`);
        res.rows.forEach(col => {
            console.log(`- ${col.column_name}: ${col.data_type}`);
        });
    }
    
    process.exit(0);
}

checkSchema();
