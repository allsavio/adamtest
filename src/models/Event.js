const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema(
  {
    contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    status: { type: String, enum: ['invited', 'confirmed', 'declined', 'waitlist'], default: 'invited' },
    guests: { type: Number, default: 0 },
    notes: String,
  },
  { timestamps: true }
);

const attendanceSchema = new mongoose.Schema(
  {
    contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    checkedInAt: Date,
    followUpStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    followUpActions: { type: [String], default: [] },
  },
  { timestamps: true }
);

const sponsorshipSchema = new mongoose.Schema(
  {
    contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    contributionType: { type: String, enum: ['cash', 'in-kind', 'other'], default: 'cash' },
    amount: Number,
    notes: String,
  },
  { timestamps: true }
);

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ['topgolf', 'poker', 'wine', 'retreat', 'training', 'faith', 'family', 'other'], default: 'other' },
    startDate: { type: Date, required: true },
    endDate: Date,
    location: String,
    description: String,
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    rsvps: { type: [rsvpSchema], default: [] },
    attendance: { type: [attendanceSchema], default: [] },
    sponsorships: { type: [sponsorshipSchema], default: [] },
    followUpTemplate: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
