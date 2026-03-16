const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'canela123$$',
  database: 'cb_database',
  port: 5432,
});

async function resetPasswords() {
    const password = '123456';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const users = ['admin@consulbank.com.ve', 'alopez', 'cmartinez', 'mgonzalez'];
    
    console.log(`Reseteando contraseñas a: ${password}`);
    
    for (const user of users) {
        await pool.query('UPDATE auth_users SET password = $1 WHERE username = $2', [hash, user]);
        console.log(`✅ ${user} actualizado.`);
    }
    
    // Also ensure the 40 test users have it (though they should already have it if created by the script)
    await pool.query("UPDATE auth_users SET password = $1 WHERE username LIKE 'user_%@test.com'", [hash]);
    
    const result = await pool.query(`
        SELECT u.username, r.name as role_name
        FROM auth_users u
        LEFT JOIN roles r ON u.role_id = r.id
        WHERE u.username IN ($1, $2, $3, $4)
        ORDER BY r.name
    `, users);

    console.log('\nCREDENCIALES PARA PRUEBAS:');
    console.table(result.rows.map(row => ({
        Usuario: row.username,
        Rol: row.role_name || 'Sin Rol',
        Clave: password
    })));

    await pool.end();
}

resetPasswords().catch(console.error);
