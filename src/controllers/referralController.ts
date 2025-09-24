import { Request, Response } from 'express';
import {
  createReferral,
  listReferralsByCategory,
  updateReferralStatus
} from '../modules/networking/referralService.js';

export const createReferralHandler = async (req: Request, res: Response) => {
  try {
    const referral = await createReferral(req.body);
    res.status(201).json(referral);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updateReferralStatusHandler = async (req: Request, res: Response) => {
  try {
    const referral = await updateReferralStatus(req.params.id, req.body.status);
    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }
    res.json(referral);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const listReferralsByCategoryHandler = async (req: Request, res: Response) => {
  try {
    const referrals = await listReferralsByCategory(req.params.category as any);
    res.json(referrals);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
