import { Router } from 'express';
import {
  createContactHandler,
  deleteContactHandler,
  listContactsHandler,
  updateContactHandler
} from '../controllers/contactController.js';

const router = Router();

router.post('/', createContactHandler);
router.get('/', listContactsHandler);
router.put('/:id', updateContactHandler);
router.delete('/:id', deleteContactHandler);

export default router;
