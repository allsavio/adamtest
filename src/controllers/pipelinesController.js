const RecruitmentPipeline = require('../models/RecruitmentPipeline');
const { deriveNextSteps } = require('../services/automationService');

exports.listPipelines = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.stage) {
      filters.currentStage = req.query.stage;
    }
    const pipelines = await RecruitmentPipeline.find(filters)
      .populate('agent')
      .populate('assignedTo')
      .sort({ updatedAt: -1 });
    res.json(pipelines);
  } catch (error) {
    next(error);
  }
};

exports.createPipeline = async (req, res, next) => {
  try {
    const steps = req.body.steps?.length ? req.body.steps : deriveNextSteps('invited');
    const pipeline = await RecruitmentPipeline.create({ ...req.body, steps });
    res.status(201).json(pipeline);
  } catch (error) {
    next(error);
  }
};

exports.updateStage = async (req, res, next) => {
  try {
    const { stage } = req.body;
    const pipeline = await RecruitmentPipeline.findById(req.params.pipelineId);
    if (!pipeline) {
      return res.status(404).json({ message: 'Pipeline not found' });
    }
    pipeline.currentStage = stage;
    pipeline.steps = deriveNextSteps(stage, pipeline.steps);
    await pipeline.save();
    res.json(pipeline);
  } catch (error) {
    next(error);
  }
};

exports.updateStep = async (req, res, next) => {
  try {
    const pipeline = await RecruitmentPipeline.findById(req.params.pipelineId);
    if (!pipeline) {
      return res.status(404).json({ message: 'Pipeline not found' });
    }
    const step = pipeline.steps.id(req.params.stepId);
    if (!step) {
      return res.status(404).json({ message: 'Pipeline step not found' });
    }
    step.status = req.body.status || step.status;
    step.notes = req.body.notes ?? step.notes;
    step.completedAt = req.body.completedAt || (req.body.status === 'completed' ? new Date() : step.completedAt);
    step.dueDate = req.body.dueDate ?? step.dueDate;
    await pipeline.save();
    res.json(pipeline);
  } catch (error) {
    next(error);
  }
};
