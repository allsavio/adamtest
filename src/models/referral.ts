import mongoose, { Schema, Document, Types } from 'mongoose';

export type ReferralCategory =
  | 'cpa'
  | 'divorce-attorney'
  | 'contractor'
  | 'lender'
  | 'insurance'
  | 'estate-planning'
  | 'other';

export interface ReferralAgreementPrompt {
  model: string;
  prompt: string;
  lastGeneratedAt: Date;
}

export interface ReferralDocument extends Document {
  referrer: Types.ObjectId;
  referee: Types.ObjectId;
  referredContact?: Types.ObjectId;
  referralCategory: ReferralCategory;
  referralValue?: number;
  status: 'initiated' | 'in-progress' | 'closed' | 'lost';
  agreementPrompt: ReferralAgreementPrompt;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReferralSchema = new Schema<ReferralDocument>(
  {
    referrer: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
    referee: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
    referredContact: { type: Schema.Types.ObjectId, ref: 'Contact' },
    referralCategory: {
      type: String,
      enum: ['cpa', 'divorce-attorney', 'contractor', 'lender', 'insurance', 'estate-planning', 'other'],
      default: 'other'
    },
    referralValue: { type: Number },
    status: {
      type: String,
      enum: ['initiated', 'in-progress', 'closed', 'lost'],
      default: 'initiated'
    },
    agreementPrompt: {
      model: { type: String, required: true },
      prompt: { type: String, required: true },
      lastGeneratedAt: { type: Date, default: Date.now }
    },
    notes: { type: String }
  },
  { timestamps: true }
);

ReferralSchema.index({ referralCategory: 1 });
ReferralSchema.index({ status: 1 });
ReferralSchema.index({ referrer: 1, referee: 1 });

export const ReferralModel = mongoose.model<ReferralDocument>('Referral', ReferralSchema);
