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
exports.getAllPayments = exports.getPaymentStats = void 0;
const db_1 = __importDefault(require("../config/db"));
const logger_1 = require("../utils/logger");
const getPaymentStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Stats by status
        const statusStats = yield db_1.default.query(`
            SELECT status, COUNT(*)::int as count, SUM(monto)::float as total_amount 
            FROM affiliate_payments 
            GROUP BY status
        `);
        // Stats by method
        const methodStats = yield db_1.default.query(`
            SELECT metodo_pago as method, COUNT(*)::int as count, SUM(monto)::float as total_amount 
            FROM affiliate_payments 
            GROUP BY metodo_pago
        `);
        // Daily stats (last 30 days)
        const dailyStats = yield db_1.default.query(`
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
    }
    catch (error) {
        (0, logger_1.logError)(error, 'getPaymentStats');
        res.status(500).json({ message: 'Error al obtener estadísticas de pagos' });
    }
});
exports.getPaymentStats = getPaymentStats;
const getAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query(`
            SELECT 
                p.id, p.monto, p.metodo_pago, p.referencia, p.status, p.fecha_pago, p.moneda,
                u.full_name as user_name, u.username as user_email
            FROM affiliate_payments p
            LEFT JOIN auth_users u ON p.affiliate_id = u.affiliate_id
            ORDER BY p.fecha_pago DESC
        `);
        res.json(result.rows);
    }
    catch (error) {
        (0, logger_1.logError)(error, 'getAllPayments');
        res.status(500).json({ message: 'Error al obtener listado de pagos' });
    }
});
exports.getAllPayments = getAllPayments;
