import mongoose, { Schema, Document, Types } from 'mongoose';

export type RecruitmentStage =
  | 'invited'
  | 'event'
  | 'one-on-one'
  | 'paperwork'
  | 'onboarding'
  | 'active-agent';

export interface StageActionPlan {
  stage: RecruitmentStage;
  actions: string[];
}

export interface PipelineTouchpoint {
  stage: RecruitmentStage;
  notes: string;
  createdAt: Date;
  completedActions: string[];
  scheduledNextTouch?: Date;
}

export interface RecruitmentPipelineDocument extends Document {
  candidate: Types.ObjectId;
  recruitingBroker: Types.ObjectId;
  currentStage: RecruitmentStage;
  stageHistory: PipelineTouchpoint[];
  actionPlan: StageActionPlan[];
  createdAt: Date;
  updatedAt: Date;
}

const RecruitmentPipelineSchema = new Schema<RecruitmentPipelineDocument>(
  {
    candidate: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
    recruitingBroker: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
    currentStage: {
      type: String,
      enum: ['invited', 'event', 'one-on-one', 'paperwork', 'onboarding', 'active-agent'],
      default: 'invited'
    },
    stageHistory: [
      {
        stage: {
          type: String,
          enum: ['invited', 'event', 'one-on-one', 'paperwork', 'onboarding', 'active-agent'],
          required: true
        },
        notes: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        completedActions: { type: [String], default: [] },
        scheduledNextTouch: { type: Date }
      }
    ],
    actionPlan: [
      {
        stage: {
          type: String,
          enum: ['invited', 'event', 'one-on-one', 'paperwork', 'onboarding', 'active-agent'],
          required: true
        },
        actions: { type: [String], default: [] }
      }
    ]
  },
  { timestamps: true }
);

RecruitmentPipelineSchema.index({ candidate: 1 }, { unique: true });
RecruitmentPipelineSchema.index({ currentStage: 1 });

export const RecruitmentPipelineModel = mongoose.model<RecruitmentPipelineDocument>(
  'RecruitmentPipeline',
  RecruitmentPipelineSchema
);
