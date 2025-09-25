const Referral = require('../models/Referral');
const { buildReferralAgreementPrompt } = require('../services/agreementService');

exports.listReferrals = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.category) {
      filters.category = req.query.category;
    }
    if (req.query.status) {
      filters.status = req.query.status;
    }
    const referrals = await Referral.find(filters)
      .populate('referrer')
      .populate('referee')
      .sort({ createdAt: -1 });
    res.json(referrals);
  } catch (error) {
    next(error);
  }
};

exports.createReferral = async (req, res, next) => {
  try {
    const agreementPrompt = buildReferralAgreementPrompt(req.body);
    const referral = await Referral.create({ ...req.body, agreementPrompt });
    res.status(201).json(referral);
  } catch (error) {
    next(error);
  }
};

exports.getReferral = async (req, res, next) => {
  try {
    const referral = await Referral.findById(req.params.referralId)
      .populate('referrer')
      .populate('referee');
    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }
    res.json(referral);
  } catch (error) {
    next(error);
  }
};

exports.updateReferral = async (req, res, next) => {
  try {
    const updatePayload = { ...req.body };
    if (req.body.status && req.body.status === 'closed' && !req.body.agreementPrompt) {
      updatePayload.agreementPrompt = buildReferralAgreementPrompt({ ...req.body, refresh: true });
    }
    const referral = await Referral.findByIdAndUpdate(req.params.referralId, updatePayload, {
      new: true,
      runValidators: true,
    });
    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }
    res.json(referral);
  } catch (error) {
    next(error);
  }
};
