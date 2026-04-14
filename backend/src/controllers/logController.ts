import { Request, Response } from 'express';
import pool from '../config/db';
import fs from 'fs';
import path from 'path';

export const getActivityLogs = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT l.*, u.username, u.full_name 
            FROM activity_logs l
            LEFT JOIN auth_users u ON l.user_id = u.id
            ORDER BY l.created_at DESC
            LIMIT 100
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error in getActivityLogs:', error);
        res.status(500).json({ message: 'Error al obtener el historial' });
    }
};

export const getErrorLogs = async (req: Request, res: Response) => {
    try {
        const logFilePath = path.resolve(process.cwd(), '../logs/errors.log');
        
        if (!fs.existsSync(logFilePath)) {
            return res.json([]);
        }

        const data = fs.readFileSync(logFilePath, 'utf8');
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
    } catch (error) {
        console.error('Error in getErrorLogs:', error);
        res.status(500).json({ message: 'Error al leer los logs de errores' });
    }
};

export const clearErrorLogs = async (req: Request, res: Response) => {
    try {
        const logFilePath = path.resolve(process.cwd(), '../logs/errors.log');
        
        if (fs.existsSync(logFilePath)) {
            fs.writeFileSync(logFilePath, '', 'utf8');
        }

        res.json({ message: 'Logs de errores vaciados con éxito' });
    } catch (error) {
        console.error('Error in clearErrorLogs:', error);
        res.status(500).json({ message: 'Error al vaciar los logs de errores' });
    }
};
