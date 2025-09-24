import { Router } from 'express';
import {
  addRsvpHandler,
  addSponsorHandler,
  createEventHandler,
  recordAttendanceHandler,
  scheduleFollowUpHandler
} from '../controllers/eventController.js';

const router = Router();

router.post('/', createEventHandler);
router.post('/:id/rsvps', addRsvpHandler);
router.post('/:id/attendance', recordAttendanceHandler);
router.post('/:id/follow-ups', scheduleFollowUpHandler);
router.post('/:id/sponsors', addSponsorHandler);

export default router;
