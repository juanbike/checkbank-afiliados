import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { logError } from './utils/logger';
import pool from './config/db';

// Cargar configuración de manera robusta (Busca en múltiples ubicaciones)
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta de prueba para verificar que el servidor Node.js está activo
app.get('/', (req, res) => {
    res.send('Servidor ConsulBank API Activo 🚀');
});

// Ruta de diagnóstico para CPanel
app.get('/api/auth/test-env', async (req, res) => {
    let dbStatus = "No intentado";
    let usersCount = 0;
    let logsCount = 0;
    let tableExists = false;
    let insertTestResult = "No intentado";

    try {
        const resUsers = await pool.query('SELECT COUNT(*) FROM auth_users');
        usersCount = parseInt(resUsers.rows[0].count);
        
        try {
            const resLogs = await pool.query('SELECT COUNT(*) FROM activity_logs');
            logsCount = parseInt(resLogs.rows[0].count);
            tableExists = true;

            // Try dummy insert
            try {
                await pool.query(
                    `INSERT INTO activity_logs (action, details) VALUES ($1, $2)`,
                    ['TEST_INSERT', JSON.stringify({ test: "ok" })]
                );
                insertTestResult = "Insert exitoso ✅";
            } catch (insertErr: any) {
                insertTestResult = `Error insert: ${insertErr.message}`;
            }

        } catch (e: any) {
            tableExists = false;
        }
        
        dbStatus = "¡Conexión Exitosa! ✅";
    } catch (err: any) {
        dbStatus = `Error de conexión: ${err.message}`;
    }

    res.json({
        db_connection: dbStatus,
        auth_users_count: usersCount,
        activity_logs_count: logsCount,
        activity_logs_table_exists: tableExists,
        activity_logs_insert_test: insertTestResult,
        env_keys: Object.keys(process.env).filter(key => key.includes('DB_') || key.includes('JWT'))
    });
});

app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes';
import affiliateRoutes from './routes/affiliateRoutes';
import logRoutes from './routes/logRoutes';
import paymentRoutes from './routes/paymentRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/affiliates', affiliateRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Middleware Global para captura de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logError(err, `${req.method} ${req.url}`);
    res.status(500).json({
        message: 'Ocurrió un error interno en el servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
