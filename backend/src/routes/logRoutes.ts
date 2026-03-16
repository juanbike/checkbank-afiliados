import { Router, Request, Response } from 'express';
import { logError } from '../utils/logger';
import { getActivityLogs, getErrorLogs, clearErrorLogs } from '../controllers/logController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';

const router = Router();

// Solo el admin puede ver los historiales
router.get('/', authenticateToken, authorizeRoles('admin'), getActivityLogs);
router.get('/errors', authenticateToken, authorizeRoles('admin'), getErrorLogs);
router.delete('/errors', authenticateToken, authorizeRoles('admin'), clearErrorLogs);

router.post('/', (req: Request, res: Response) => {
    const { error, context, metadata } = req.body;
    
    logError(
        {
            message: error,
            stack: metadata?.stack
        },
        `FRONTEND: ${context || 'General'}`
    );

    res.status(200).json({ status: 'logged' });
});

export default router;
