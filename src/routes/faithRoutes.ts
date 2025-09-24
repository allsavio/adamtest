import { Router } from 'express';
import {
  addJournalEntryHandler,
  addVirtueMetricHandler,
  upsertFaithPracticeHandler
} from '../controllers/faithController.js';

const router = Router({ mergeParams: true });

router.put('/:ownerId', upsertFaithPracticeHandler);
router.post('/:ownerId/journal', addJournalEntryHandler);
router.post('/:ownerId/virtues', addVirtueMetricHandler);

export default router;
