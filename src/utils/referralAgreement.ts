import { ReferralDocument } from '../models/referral.js';
import { ContactDocument } from '../models/contact.js';

export const generateReferralAgreementPrompt = (
  referral: Pick<ReferralDocument, 'referralCategory' | 'notes' | 'referralValue'>,
  referrer?: Pick<ContactDocument, 'firstName' | 'lastName' | 'company' | 'email'>,
  referee?: Pick<ContactDocument, 'firstName' | 'lastName' | 'company' | 'email'>
): string => {
  const referrerName = referrer ? `${referrer.firstName} ${referrer.lastName}` : 'Referrer';
  const refereeName = referee ? `${referee.firstName} ${referee.lastName}` : 'Referee';

  const valueStatement = referral.referralValue
    ? `The anticipated commission or referral fee for this transaction is approximately $${referral.referralValue}.`
    : 'The financial terms will be determined based on the resulting transaction.';

  const notesSection = referral.notes ? `Additional context: ${referral.notes}` : '';

  return `You are an assistant that drafts short-form referral agreements between professionals.
Generate a concise agreement covering purpose, referral fee, payment timeline, exclusivity, confidentiality, and governing law.
Participants: ${referrerName} (${referrer?.company ?? 'N/A'}) and ${refereeName} (${referee?.company ?? 'N/A'}).
Referral category: ${referral.referralCategory}.
${valueStatement}
${notesSection}`.trim();
};
