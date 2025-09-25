const FaithRoutine = require('../models/FaithRoutine');

exports.listRoutines = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.owner) {
      filters.owner = req.query.owner;
    }
    if (req.query.type) {
      filters.type = req.query.type;
    }
    const routines = await FaithRoutine.find(filters).populate('owner');
    res.json(routines);
  } catch (error) {
    next(error);
  }
};

exports.createRoutine = async (req, res, next) => {
  try {
    const routine = await FaithRoutine.create(req.body);
    res.status(201).json(routine);
  } catch (error) {
    next(error);
  }
};

exports.appendJournalEntry = async (req, res, next) => {
  try {
    const routine = await FaithRoutine.findById(req.params.routineId);
    if (!routine) {
      return res.status(404).json({ message: 'Faith routine not found' });
    }
    routine.journalEntries.push({
      entryDate: req.body.entryDate || new Date(),
      title: req.body.title || '',
      content: req.body.content || '',
      virtues: req.body.virtues || [],
    });
    await routine.save();
    res.json(routine);
  } catch (error) {
    next(error);
  }
};
