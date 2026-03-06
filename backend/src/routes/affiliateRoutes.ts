import { Router } from 'express';
import { initAffiliate, activateAffiliate, getAffiliates } from '../controllers/affiliateController';

const router = Router();

router.post('/init', initAffiliate);
router.post('/activate', activateAffiliate);
router.get('/', getAffiliates);

export default router;
