import { Router } from 'express';
import { 
    initAffiliate, 
    activateAffiliate, 
    getAffiliates, 
    updatePlan, 
    getProfile,
    getAffiliateById,
    updateAffiliate,
    deleteAffiliate
} from '../controllers/affiliateController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/init', initAffiliate);
router.post('/activate', activateAffiliate);
router.get('/', getAffiliates);
router.get('/profile', authenticateToken, getProfile);
router.get('/:id', getAffiliateById);
router.put('/:id', updateAffiliate);
router.delete('/:id', deleteAffiliate);
router.post('/update-plan', authenticateToken, updatePlan);

export default router;
