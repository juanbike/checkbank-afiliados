import { Router } from 'express';
import { getPaymentStats, getAllPayments } from '../controllers/paymentController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';

const router = Router();

// Todas las rutas requieren autenticación y rol de administrador
router.use(authenticateToken);
router.use(authorizeRoles('admin'));

router.get('/stats', getPaymentStats);
router.get('/', getAllPayments);

export default router;
