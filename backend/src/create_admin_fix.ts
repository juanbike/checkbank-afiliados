import pool from './config/db';
import bcrypt from 'bcryptjs';

async function createAdmin() {
    const username = 'admin@consulbank.com.ve';
    const password = '123456';
    const hash = await bcrypt.hash(password, 10);
    
    // Check if role admin exists
    const roleRes = await pool.query("SELECT id FROM roles WHERE slug = 'admin'");
    const adminRoleId = roleRes.rows[0]?.id;
    
    if (!adminRoleId) {
        console.error("No existe el rol admin. Por favor ejecuta el script de roles primero.");
        process.exit(1);
    }
    
    await pool.query(`
        INSERT INTO auth_users (username, password, full_name, role_id, branch)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (username) DO UPDATE 
        SET password = EXCLUDED.password, role_id = EXCLUDED.role_id
    `, [username, hash, 'Administrador Sistema', adminRoleId, 'Principal']);
    
    console.log(`✅ Usuario ${username} creado/actualizado con éxito.`);
    process.exit(0);
}

createAdmin();
