import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logError, logActivity } from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(`Intentando login para: [${username}] con password de longitud: ${password?.length}`);

    try {
        // Obtenemos el usuario y su información de rol básica
        const userResult = await pool.query(
            `SELECT u.id, u.username, u.password, u.full_name, u.branch, 
                    r.slug as role_slug, r.name as role_name, r.id as role_id
             FROM auth_users u
             LEFT JOIN roles r ON u.role_id = r.id
             WHERE u.username = $1`,
            [username]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const user = userResult.rows[0];

        // Verificación de contraseña con bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Obtener la lista de permisos para este rol
        let permissions: string[] = [];
        if (user.role_id) {
            const permResult = await pool.query(
                `SELECT p.slug 
                 FROM permissions p
                 JOIN role_permissions rp ON p.id = rp.permission_id
                 WHERE rp.role_id = $1`,
                [user.role_id]
            );
            permissions = permResult.rows.map(row => row.slug);
        }

        // Generar JWT (incluimos el role_slug para chequeos rápidos en el backend)
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role_slug || 'guest',
                permissions: permissions
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

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
        await logActivity({
            userId: user.id,
            action: 'LOGIN',
            details: { username: user.username },
            ipAddress: req.ip
        });

    } catch (error: any) {
        logError(error, 'Login Process');
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
