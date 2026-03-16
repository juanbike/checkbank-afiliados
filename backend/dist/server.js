"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("./utils/logger");
const db_1 = __importDefault(require("./config/db"));
// Cargar configuración de manera robusta (Busca en múltiples ubicaciones)
dotenv_1.default.config();
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Ruta de prueba para verificar que el servidor Node.js está activo
app.get('/', (req, res) => {
    res.send('Servidor ConsulBank API Activo 🚀');
});
// Ruta de diagnóstico para CPanel
app.get('/api/auth/test-env', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dbStatus = "No intentado";
    let usersCount = 0;
    let logsCount = 0;
    let tableExists = false;
    let insertTestResult = "No intentado";
    try {
        const resUsers = yield db_1.default.query('SELECT COUNT(*) FROM auth_users');
        usersCount = parseInt(resUsers.rows[0].count);
        try {
            const resLogs = yield db_1.default.query('SELECT COUNT(*) FROM activity_logs');
            logsCount = parseInt(resLogs.rows[0].count);
            tableExists = true;
            // Try dummy insert
            try {
                yield db_1.default.query(`INSERT INTO activity_logs (action, details) VALUES ($1, $2)`, ['TEST_INSERT', JSON.stringify({ test: "ok" })]);
                insertTestResult = "Insert exitoso ✅";
            }
            catch (insertErr) {
                insertTestResult = `Error insert: ${insertErr.message}`;
            }
        }
        catch (e) {
            tableExists = false;
        }
        dbStatus = "¡Conexión Exitosa! ✅";
    }
    catch (err) {
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
}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const affiliateRoutes_1 = __importDefault(require("./routes/affiliateRoutes"));
const logRoutes_1 = __importDefault(require("./routes/logRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/affiliates', affiliateRoutes_1.default);
app.use('/api/logs', logRoutes_1.default);
app.use('/api/payments', paymentRoutes_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
// Middleware Global para captura de errores
app.use((err, req, res, next) => {
    (0, logger_1.logError)(err, `${req.method} ${req.url}`);
    res.status(500).json({
        message: 'Ocurrió un error interno en el servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
