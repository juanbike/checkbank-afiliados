import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
// Intentamos cargar desde la raíz del proyecto (local) y desde la carpeta actual (producción CPanel)
dotenv.config(); // Intenta en el CWD (Current Working Directory)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // Para dist/config/db.js -> raíz
dotenv.config({ path: path.resolve(__dirname, '../../../.env') }); // Para src/config/db.ts -> raíz

if (!process.env.DB_USER || !process.env.DB_NAME) {
    console.error('❌ Error de Configuración: Falta el usuario o nombre de la base de datos en el archivo .env');
    console.error('Variables actuales:', {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME
    });
}

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS ? process.env.DB_PASS.replace(/"/g, '') : '',
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;
