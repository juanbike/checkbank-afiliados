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
exports.login = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../utils/logger");
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(`Intentando login para: [${username}] con password de longitud: ${password === null || password === void 0 ? void 0 : password.length}`);
    try {
        // Obtenemos el usuario y su información de rol básica
        const userResult = yield db_1.default.query(`SELECT u.id, u.username, u.password, u.full_name, u.branch, 
                    r.slug as role_slug, r.name as role_name, r.id as role_id
             FROM auth_users u
             LEFT JOIN roles r ON u.role_id = r.id
             WHERE u.username = $1`, [username]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
        const user = userResult.rows[0];
        // Verificación de contraseña con bcrypt
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
        // Obtener la lista de permisos para este rol
        let permissions = [];
        if (user.role_id) {
            const permResult = yield db_1.default.query(`SELECT p.slug 
                 FROM permissions p
                 JOIN role_permissions rp ON p.id = rp.permission_id
                 WHERE rp.role_id = $1`, [user.role_id]);
            permissions = permResult.rows.map(row => row.slug);
        }
        // Generar JWT (incluimos el role_slug para chequeos rápidos en el backend)
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
            role: user.role_slug || 'guest',
            permissions: permissions
        }, JWT_SECRET, { expiresIn: '24h' });
        // Estructuramos la respuesta para el Frontend
        const userData = {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            branch: user.branch,
            role: {
                id: user.role_id,
                slug: user.role_slug,
                name: user.role_name
            },
            permissions: permissions
        };
        res.json({
            message: 'Login exitoso',
            user: userData,
            token
        });
        // Log the activity
        yield (0, logger_1.logActivity)({
            userId: user.id,
            action: 'LOGIN',
            details: { username: user.username },
            ipAddress: req.ip
        });
    }
    catch (error) {
        (0, logger_1.logError)(error, 'Login Process');
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.login = login;
