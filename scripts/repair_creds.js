const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'canela123$$',
  database: 'cb_database',
  port: 5432,
});

async function repairCredentials() {
    try {
        const password = '123456';
        console.log(`Generando hash real para la clave: ${password}`);
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        console.log(`Hash generado: ${hash}`);

        const users = ['admin@consulbank.com.ve', 'alopez', 'cmartinez', 'mgonzalez'];
        
        for (const user of users) {
             const res = await pool.query('UPDATE auth_users SET password = $1 WHERE username = $2 RETURNING id', [hash, user]);
             if (res.rowCount > 0) {
                 console.log(`✅ Usuario '${user}' actualizado con éxito.`);
             } else {
                 console.log(`⚠️ Usuario '${user}' no encontrado en la tabla auth_users.`);
             }
        }

        // También actualizar los autogenerados por si acaso
        const testUsersUpdate = await pool.query("UPDATE auth_users SET password = $1 WHERE username LIKE 'user_%@test.com'", [hash]);
        console.log(`✅ ${testUsersUpdate.rowCount} usuarios de prueba actualizados.`);

        await pool.end();
        console.log("\nProceso finalizado. Intenta loguearte ahora con '123456'.");
    } catch (err) {
        console.error("Error reparando credenciales:", err);
    }
}

repairCredentials();
