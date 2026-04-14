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
exports.clearErrorLogs = exports.getErrorLogs = exports.getActivityLogs = void 0;
const db_1 = __importDefault(require("../config/db"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getActivityLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query(`
            SELECT l.*, u.username, u.full_name 
            FROM activity_logs l
            LEFT JOIN auth_users u ON l.user_id = u.id
            ORDER BY l.created_at DESC
            LIMIT 100
        `);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error in getActivityLogs:', error);
        res.status(500).json({ message: 'Error al obtener el historial' });
    }
});
exports.getActivityLogs = getActivityLogs;
const getErrorLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logFilePath = path_1.default.resolve(process.cwd(), '../logs/errors.log');
        if (!fs_1.default.existsSync(logFilePath)) {
            return res.json([]);
        }
        const data = fs_1.default.readFileSync(logFilePath, 'utf8');
        const entries = data.split('-'.repeat(80)).filter(e => e.trim());
        // Convert to objects
        const parsed = entries.reverse().slice(0, 100).map(entry => {
            const lines = entry.trim().split('\n');
            const headerLine = lines[0] || '';
            const match = headerLine.match(/^\[(.*?)\] \[(.*?)\]\s*(.*)/);
            const messageFromHeader = match ? match[3] : '';
            const restOfMessage = lines.slice(1).join('\n').trim();
            const fullMessage = (messageFromHeader + (messageFromHeader && restOfMessage ? '\n' : '') + restOfMessage).trim() || headerLine;
            return {
                timestamp: match ? match[1] : 'N/A',
                context: match ? match[2] : 'General',
                message: fullMessage
            };
        });
        res.json(parsed);
    }
    catch (error) {
        console.error('Error in getErrorLogs:', error);
        res.status(500).json({ message: 'Error al leer los logs de errores' });
    }
});
exports.getErrorLogs = getErrorLogs;
const clearErrorLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logFilePath = path_1.default.resolve(process.cwd(), '../logs/errors.log');
        if (fs_1.default.existsSync(logFilePath)) {
            fs_1.default.writeFileSync(logFilePath, '', 'utf8');
        }
        res.json({ message: 'Logs de errores vaciados con éxito' });
    }
    catch (error) {
        console.error('Error in clearErrorLogs:', error);
        res.status(500).json({ message: 'Error al vaciar los logs de errores' });
    }
});
exports.clearErrorLogs = clearErrorLogs;
