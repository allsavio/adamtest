import { Types } from 'mongoose';
import { FaithPracticeDocument, FaithPracticeModel } from '../../models/faithPractice.js';

export const upsertFaithPractice = async (
  ownerId: string,
  updates: Partial<FaithPracticeDocument>
): Promise<FaithPracticeDocument> => {
  const faithPractice = await FaithPracticeModel.findOneAndUpdate(
    { owner: new Types.ObjectId(ownerId) },
    {
      $setOnInsert: { owner: new Types.ObjectId(ownerId) },
      $set: updates
    },
    { new: true, upsert: true }
  );

  if (!faithPractice) {
    throw new Error('Unable to upsert faith practice');
  }

  return faithPractice;
};

export const addJournalEntry = async (
  ownerId: string,
  entry: FaithPracticeDocument['journal'][number]
): Promise<FaithPracticeDocument | null> => {
  return FaithPracticeModel.findOneAndUpdate(
    { owner: new Types.ObjectId(ownerId) },
    {
      $push: {
        journal: entry
      }
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

export const addVirtueMetric = async (
  ownerId: string,
  metric: FaithPracticeDocument['virtueMetrics'][number]
): Promise<FaithPracticeDocument | null> => {
  return FaithPracticeModel.findOneAndUpdate(
    { owner: new Types.ObjectId(ownerId) },
    {
      $push: {
        virtueMetrics: metric
      }
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};
