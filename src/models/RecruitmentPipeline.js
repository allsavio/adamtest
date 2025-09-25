const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'skipped'], default: 'pending' },
    dueDate: Date,
    completedAt: Date,
    automationTrigger: { type: String, default: '' },
    notes: String,
  },
  { timestamps: true }
);

const recruitmentPipelineSchema = new mongoose.Schema(
  {
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    currentStage: { type: String, enum: ['invited', 'event', 'one-on-one', 'onboarding', 'closed'], default: 'invited' },
    steps: { type: [stepSchema], default: [] },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('RecruitmentPipeline', recruitmentPipelineSchema);
