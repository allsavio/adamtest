const express = require('express');
const router = express.Router();
const faithController = require('../controllers/faithController');

router.get('/', faithController.listRoutines);
router.post('/', faithController.createRoutine);
router.post('/:routineId/journal', faithController.appendJournalEntry);

module.exports = router;
