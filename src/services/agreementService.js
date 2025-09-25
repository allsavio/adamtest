const buildReferralAgreementPrompt = (referralPayload) => {
  const {
    referrerName = 'Referrer Name',
    refereeName = 'Referee Name',
    category = 'professional service',
    description = '',
    expectedValue,
    commission,
    notes = '',
  } = referralPayload;

  return `Draft a referral agreement between ${referrerName} and ${refereeName} for a ${category} introduction. ` +
    `Include sections covering scope of services${description ? ` (${description})` : ''}, confidentiality, ` +
    `compliance with state real estate regulations, and compensation${commission ? ` (${commission})` : ''}. ` +
    `${expectedValue ? `Estimated deal value: ${expectedValue}. ` : ''}` +
    `${notes ? `Additional context: ${notes}. ` : ''}` +
    'Format the agreement with clear headings and signature blocks for both parties.';
};

module.exports = { buildReferralAgreementPrompt };
