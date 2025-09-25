const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.get('/', eventsController.listEvents);
router.post('/', eventsController.createEvent);
router.get('/:eventId', eventsController.getEvent);
router.put('/:eventId', eventsController.updateEvent);
router.post('/:eventId/rsvp', eventsController.upsertRsvp);
router.post('/:eventId/attendance', eventsController.logAttendance);
router.post('/:eventId/sponsorships', eventsController.addSponsorship);

module.exports = router;
