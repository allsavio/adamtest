const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    type: {
      type: String,
      enum: ['broker', 'vendor', 'sponsor', 'professional', 'family', 'investor', 'prospect', 'other'],
      default: 'other',
    },
    company: String,
    email: String,
    phone: String,
    tags: { type: [String], default: [] },
    categories: { type: [String], default: [] },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
    notes: String,
    preferredContactMethod: { type: String, enum: ['email', 'phone', 'text', 'in-person', 'other'], default: 'email' },
  },
  { timestamps: true }
);

contactSchema.virtual('displayName').get(function displayName() {
  return `${this.firstName} ${this.lastName}`.trim();
});

module.exports = mongoose.model('Contact', contactSchema);
