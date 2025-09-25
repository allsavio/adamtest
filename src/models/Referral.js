const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema(
  {
    referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    referee: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    category: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['open', 'in-progress', 'closed', 'lost'], default: 'open' },
    agreementPrompt: String,
    expectedValue: Number,
    actualValue: Number,
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Referral', referralSchema);
