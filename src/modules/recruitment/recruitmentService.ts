import { Types } from 'mongoose';
import {
  RecruitmentPipelineDocument,
  RecruitmentPipelineModel,
  RecruitmentStage
} from '../../models/recruitmentPipeline.js';

const DEFAULT_ACTION_PLAN: Record<RecruitmentStage, string[]> = {
  invited: ['Send intro text', 'Add to CRM drip', 'Invite to signature event'],
  event: ['Thank attendee', 'Send handwritten card prompt', 'Schedule coffee meeting'],
  'one-on-one': ['Discuss split & support', 'Share onboarding checklist', 'Send testimonials'],
  paperwork: ['Send ICA documents', 'Schedule broker review', 'Confirm E&O insurance'],
  onboarding: ['Create email accounts', 'Enroll in MLS/boards', 'Assign mentor'],
  'active-agent': ['Add to accountability pod', 'Schedule 30-day check-in', 'Track production KPIs']
};

export interface CreatePipelinePayload {
  candidate: string;
  recruitingBroker: string;
  initialStage?: RecruitmentStage;
}

export const createPipeline = async (
  payload: CreatePipelinePayload
): Promise<RecruitmentPipelineDocument> => {
  const pipeline = new RecruitmentPipelineModel({
    candidate: new Types.ObjectId(payload.candidate),
    recruitingBroker: new Types.ObjectId(payload.recruitingBroker),
    currentStage: payload.initialStage ?? 'invited',
    actionPlan: Object.entries(DEFAULT_ACTION_PLAN).map(([stage, actions]) => ({
      stage: stage as RecruitmentStage,
      actions
    })),
    stageHistory: [
      {
        stage: payload.initialStage ?? 'invited',
        notes: 'Pipeline created',
        createdAt: new Date(),
        completedActions: [],
        scheduledNextTouch: undefined
      }
    ]
  });

  return pipeline.save();
};

export interface AdvanceStagePayload {
  notes: string;
  completedActions?: string[];
  scheduledNextTouch?: Date;
}

export const advanceStage = async (
  pipelineId: string,
  nextStage: RecruitmentStage,
  payload: AdvanceStagePayload
): Promise<RecruitmentPipelineDocument | null> => {
  const pipeline = await RecruitmentPipelineModel.findById(pipelineId);

  if (!pipeline) {
    throw new Error('Pipeline not found');
  }

  pipeline.stageHistory.push({
    stage: nextStage,
    notes: payload.notes,
    createdAt: new Date(),
    completedActions: payload.completedActions ?? [],
    scheduledNextTouch: payload.scheduledNextTouch
  });

  pipeline.currentStage = nextStage;

  return pipeline.save();
};

export const getActionPlanForStage = (
  stage: RecruitmentStage
): string[] => {
  return DEFAULT_ACTION_PLAN[stage];
};
