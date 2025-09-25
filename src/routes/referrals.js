const express = require('express');
const router = express.Router();
const referralsController = require('../controllers/referralsController');

router.get('/', referralsController.listReferrals);
router.post('/', referralsController.createReferral);
router.get('/:referralId', referralsController.getReferral);
router.put('/:referralId', referralsController.updateReferral);

module.exports = router;
