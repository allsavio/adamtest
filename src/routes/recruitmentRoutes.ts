import { Router } from 'express';
import {
  advanceStageHandler,
  createPipelineHandler,
  getStageActionPlanHandler
} from '../controllers/recruitmentController.js';

const router = Router();

router.post('/', createPipelineHandler);
router.post('/:id/advance', advanceStageHandler);
router.get('/actions/:stage', getStageActionPlanHandler);

export default router;
