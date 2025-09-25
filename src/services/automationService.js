const defaultStageTemplates = {
  invited: [
    { name: 'Send TopGolf invite email', automationTrigger: 'email:invite-topgolf', dueInDays: 1 },
    { name: 'Confirm RSVP', automationTrigger: 'task:confirm-rsvp', dueInDays: 3 },
  ],
  event: [
    { name: 'Send handwritten thank-you card', automationTrigger: 'prompt:handwritten-card', dueInDays: 2 },
    { name: 'Schedule coffee meeting', automationTrigger: 'calendar:coffee', dueInDays: 5 },
  ],
  'one-on-one': [
    { name: 'Prepare onboarding packet', automationTrigger: 'doc:onboarding-packet', dueInDays: 2 },
    { name: 'Send recap email', automationTrigger: 'email:recap', dueInDays: 1 },
  ],
  onboarding: [
    { name: 'Collect paperwork', automationTrigger: 'task:paperwork', dueInDays: 1 },
    { name: 'Set up CRM access', automationTrigger: 'task:crm', dueInDays: 2 },
  ],
  closed: [
    { name: 'Celebrate win with team', automationTrigger: 'task:celebrate', dueInDays: 1 },
  ],
};

const deriveNextSteps = (stage, existingSteps = []) => {
  const templates = defaultStageTemplates[stage] || [];
  const now = new Date();
  const generatedSteps = templates.map((template) => ({
    name: template.name,
    automationTrigger: template.automationTrigger,
    dueDate: template.dueInDays ? new Date(now.getTime() + template.dueInDays * 86400000) : undefined,
    status: 'pending',
  }));
  if (!existingSteps.length) {
    return generatedSteps;
  }
  const completed = existingSteps.filter((step) => step.status === 'completed');
  return [...completed, ...generatedSteps];
};

const generateFollowUpTasks = (event) => {
  switch (event.category) {
    case 'topgolf':
      return ['Send thank-you text', 'Invite to follow-up coffee'];
    case 'poker':
      return ['Share game night photos', 'Invite to sponsor upcoming event'];
    case 'retreat':
      return ['Send reflection email', 'Schedule debrief call'];
    default:
      return ['Send thank-you note'];
  }
};

module.exports = { deriveNextSteps, generateFollowUpTasks };
