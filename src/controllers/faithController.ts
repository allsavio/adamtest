import { Request, Response } from 'express';
import { addJournalEntry, addVirtueMetric, upsertFaithPractice } from '../modules/faith/faithService.js';

export const upsertFaithPracticeHandler = async (req: Request, res: Response) => {
  try {
    const record = await upsertFaithPractice(req.params.ownerId, req.body);
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const addJournalEntryHandler = async (req: Request, res: Response) => {
  try {
    const record = await addJournalEntry(req.params.ownerId, req.body);
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const addVirtueMetricHandler = async (req: Request, res: Response) => {
  try {
    const record = await addVirtueMetric(req.params.ownerId, req.body);
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
