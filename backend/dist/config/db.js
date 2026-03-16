"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Cargar variables de entorno
// Intentamos cargar desde la raíz del proyecto (local) y desde la carpeta actual (producción CPanel)
dotenv_1.default.config(); // Intenta en el CWD (Current Working Directory)
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') }); // Para dist/config/db.js -> raíz
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') }); // Para src/config/db.ts -> raíz
if (!process.env.DB_USER || !process.env.DB_NAME) {
    console.error('❌ Error de Configuración: Falta el usuario o nombre de la base de datos en el archivo .env');
    console.error('Variables actuales:', {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME
    });
}
const pool = new pg_1.Pool({
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
exports.default = pool;
