import bcrypt from 'bcryptjs';
import pool from './config/db';

async function repair() {
    try {
        const password = '123456';
        const hash = await bcrypt.hash(password, 10);
        console.log(`Hash generado: ${hash}`);

        const users = ['admin@consulbank.com.ve', 'alopez', 'cmartinez', 'mgonzalez'];
        
        for (const user of users) {
             await pool.query('UPDATE auth_users SET password = $1 WHERE username = $2', [hash, user]);
             console.log(`✅ ${user} actualizado.`);
        }

        await pool.query("UPDATE auth_users SET password = $1 WHERE username LIKE 'user_%@test.com'", [hash]);
        console.log("✅ Usuarios de prueba actualizados.");

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

repair();
