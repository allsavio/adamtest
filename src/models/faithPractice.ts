import mongoose, { Schema, Document, Types } from 'mongoose';

export interface SpiritualRoutine {
  title: string;
  type: 'mass' | 'confession' | 'adoration' | 'prayer-group' | 'devotional' | 'other';
  schedule: {
    dayOfWeek: number[];
    startTime?: string;
    location?: string;
  };
  notes?: string;
}

export interface VirtueMetric {
  virtue: string;
  score: number;
  notes?: string;
}

export interface JournalEntry {
  title: string;
  entry: string;
  createdAt: Date;
  tags: string[];
}

export interface FaithPracticeDocument extends Document {
  owner: Types.ObjectId;
  routines: SpiritualRoutine[];
  virtueMetrics: VirtueMetric[];
  journal: JournalEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const FaithPracticeSchema = new Schema<FaithPracticeDocument>(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
    routines: [
      {
        title: { type: String, required: true },
        type: {
          type: String,
          enum: ['mass', 'confession', 'adoration', 'prayer-group', 'devotional', 'other'],
          default: 'other'
        },
        schedule: {
          dayOfWeek: { type: [Number], default: [] },
          startTime: { type: String },
          location: { type: String }
        },
        notes: { type: String }
      }
    ],
    virtueMetrics: [
      {
        virtue: { type: String, required: true },
        score: { type: Number, min: 1, max: 10, required: true },
        notes: { type: String }
      }
    ],
    journal: [
      {
        title: { type: String, required: true },
        entry: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        tags: { type: [String], default: [] }
      }
    ]
  },
  { timestamps: true }
);

FaithPracticeSchema.index({ owner: 1 }, { unique: true });
FaithPracticeSchema.index({ 'journal.tags': 1 });

export const FaithPracticeModel = mongoose.model<FaithPracticeDocument>(
  'FaithPractice',
  FaithPracticeSchema
);
