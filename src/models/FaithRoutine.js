const mongoose = require('mongoose');

const faithRoutineSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    type: { type: String, enum: ['mass', 'confession', 'prayer-group', 'devotion', 'journal', 'virtue'], required: true },
    schedule: { type: String, default: '' },
    location: String,
    intentions: { type: [String], default: [] },
    journalEntries: {
      type: [
        new mongoose.Schema(
          {
            entryDate: { type: Date, default: Date.now },
            title: String,
            content: String,
            virtues: { type: [String], default: [] },
          },
          { timestamps: true }
        ),
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FaithRoutine', faithRoutineSchema);
