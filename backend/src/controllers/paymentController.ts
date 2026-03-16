import { Request, Response } from 'express';
import pool from '../config/db';
import { logError } from '../utils/logger';

export const getPaymentStats = async (req: Request, res: Response) => {
    try {
        // Stats by status
        const statusStats = await pool.query(`
            SELECT status, COUNT(*)::int as count, SUM(monto)::float as total_amount 
            FROM affiliate_payments 
            GROUP BY status
        `);

        // Stats by method
        const methodStats = await pool.query(`
            SELECT metodo_pago as method, COUNT(*)::int as count, SUM(monto)::float as total_amount 
            FROM affiliate_payments 
            GROUP BY metodo_pago
        `);

        // Daily stats (last 30 days)
        const dailyStats = await pool.query(`
            SELECT DATE(fecha_pago) as date, SUM(monto)::float as daily_total
            FROM affiliate_payments
            WHERE fecha_pago > NOW() - INTERVAL '30 days'
            GROUP BY DATE(fecha_pago)
            ORDER BY DATE(fecha_pago) ASC
        `);

        res.json({
            statusStats: statusStats.rows,
            methodStats: methodStats.rows,
            dailyStats: dailyStats.rows
        });
    } catch (error) {
        logError(error, 'getPaymentStats');
        res.status(500).json({ message: 'Error al obtener estadísticas de pagos' });
    }
};

export const getAllPayments = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT 
                p.id, p.monto, p.metodo_pago, p.referencia, p.status, p.fecha_pago, p.moneda,
                u.full_name as user_name, u.username as user_email
            FROM affiliate_payments p
            LEFT JOIN auth_users u ON p.affiliate_id = u.affiliate_id
            ORDER BY p.fecha_pago DESC
        `);
        res.json(result.rows);
    } catch (error) {
        logError(error, 'getAllPayments');
        res.status(500).json({ message: 'Error al obtener listado de pagos' });
    }
};
