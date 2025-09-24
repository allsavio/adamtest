import { Request, Response } from 'express';
import {
  advanceStage,
  createPipeline,
  getActionPlanForStage
} from '../modules/recruitment/recruitmentService.js';

export const createPipelineHandler = async (req: Request, res: Response) => {
  try {
    const pipeline = await createPipeline(req.body);
    res.status(201).json(pipeline);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const advanceStageHandler = async (req: Request, res: Response) => {
  try {
    const pipeline = await advanceStage(req.params.id, req.body.nextStage, req.body);
    if (!pipeline) {
      return res.status(404).json({ message: 'Pipeline not found' });
    }
    res.json(pipeline);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getStageActionPlanHandler = async (req: Request, res: Response) => {
  try {
    const actions = getActionPlanForStage(req.params.stage as any);
    res.json({ stage: req.params.stage, actions });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
