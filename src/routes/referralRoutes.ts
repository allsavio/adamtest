import { Router } from 'express';
import {
  createReferralHandler,
  listReferralsByCategoryHandler,
  updateReferralStatusHandler
} from '../controllers/referralController.js';

const router = Router();

router.post('/', createReferralHandler);
router.patch('/:id/status', updateReferralStatusHandler);
router.get('/category/:category', listReferralsByCategoryHandler);

export default router;
