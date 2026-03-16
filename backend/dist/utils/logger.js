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
exports.logActivity = exports.logError = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("../config/db"));
const logFilePath = path_1.default.resolve(process.cwd(), '../logs/errors.log');
// Asegurar que el directorio de logs existe
const logDir = path_1.default.dirname(logFilePath);
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir, { recursive: true });
}
const logError = (error, context = 'General') => {
    const timestamp = new Date().toLocaleString();
    const errorMessage = error instanceof Error ? error.stack || error.message : JSON.stringify(error);
    const logEntry = `[${timestamp}] [${context}] ${errorMessage}\n` + '-'.repeat(80) + '\n';
    console.error(`Logging error: ${error.message || error}`);
    fs_1.default.appendFileSync(logFilePath, logEntry, 'utf8');
};
exports.logError = logError;
const logActivity = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.query(`INSERT INTO activity_logs 
            (user_id, action, entity_type, entity_id, details, ip_address) 
            VALUES ($1, $2, $3, $4, $5, $6)`, [
            data.userId || null,
            data.action,
            data.entityType || null,
            data.entityId || null,
            data.details ? JSON.stringify(data.details) : null,
            data.ipAddress || null
        ]);
    }
    catch (error) {
        console.error('Error logging activity to DB:', error);
        // We don't throw error here to avoid breaking the main process
        (0, exports.logError)(error, 'logActivity');
    }
});
exports.logActivity = logActivity;
