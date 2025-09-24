import { Types } from 'mongoose';
import { ReferralDocument, ReferralModel } from '../../models/referral.js';
import { ContactModel } from '../../models/contact.js';
import { generateReferralAgreementPrompt } from '../../utils/referralAgreement.js';

export interface CreateReferralPayload
  extends Pick<
    ReferralDocument,
    'referralCategory' | 'notes' | 'referralValue'
  > {
  referrer: string;
  referee: string;
  referredContact?: string;
}

export const createReferral = async (payload: CreateReferralPayload): Promise<ReferralDocument> => {
  const [referrer, referee] = await Promise.all([
    ContactModel.findById(payload.referrer),
    ContactModel.findById(payload.referee)
  ]);

  if (!referrer || !referee) {
    throw new Error('Referrer and referee must be valid contacts.');
  }

  const agreementPrompt = generateReferralAgreementPrompt(
    {
      referralCategory: payload.referralCategory,
      notes: payload.notes,
      referralValue: payload.referralValue
    } as ReferralDocument,
    referrer,
    referee
  );

  const referral = new ReferralModel({
    ...payload,
    referrer: new Types.ObjectId(payload.referrer),
    referee: new Types.ObjectId(payload.referee),
    referredContact: payload.referredContact ? new Types.ObjectId(payload.referredContact) : undefined,
    status: 'initiated',
    agreementPrompt: {
      model: 'gpt-4.1-mini',
      prompt: agreementPrompt,
      lastGeneratedAt: new Date()
    }
  });

  return referral.save();
};

export const updateReferralStatus = async (
  referralId: string,
  status: ReferralDocument['status']
): Promise<ReferralDocument | null> => {
  return ReferralModel.findByIdAndUpdate(
    referralId,
    { status },
    { new: true }
  );
};

export const listReferralsByCategory = async (
  category: ReferralDocument['referralCategory']
): Promise<ReferralDocument[]> => {
  return ReferralModel.find({ referralCategory: category }).populate('referrer referee referredContact').exec();
};
