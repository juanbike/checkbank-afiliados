import fs from 'fs';
import path from 'path';
import pool from '../config/db';

const logFilePath = path.resolve(process.cwd(), '../logs/errors.log');

// Asegurar que el directorio de logs existe
const logDir = path.dirname(logFilePath);
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

export const logError = (error: any, context: string = 'General') => {
    const timestamp = new Date().toLocaleString();
    const errorMessage = error instanceof Error ? error.stack || error.message : JSON.stringify(error);

    const logEntry = `[${timestamp}] [${context}]\n${errorMessage}\n` + '-'.repeat(80) + '\n';

    console.error(`Logging error: ${error.message || error}`);

    fs.appendFileSync(logFilePath, logEntry, 'utf8');
};

export const logActivity = async (data: {
    userId?: string;
    action: string;
    entityType?: string;
    entityId?: string;
    details?: any;
    ipAddress?: string;
}) => {
    try {
        await pool.query(
            `INSERT INTO activity_logs 
            (user_id, action, entity_type, entity_id, details, ip_address) 
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [
                data.userId || null,
                data.action,
                data.entityType || null,
                data.entityId || null,
                data.details ? JSON.stringify(data.details) : null,
                data.ipAddress || null
            ]
        );
    } catch (error) {
        console.error('Error logging activity to DB:', error);
        // We don't throw error here to avoid breaking the main process
        logError(error, 'logActivity');
    }
};
