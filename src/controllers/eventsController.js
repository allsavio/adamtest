const Event = require('../models/Event');
const { generateFollowUpTasks } = require('../services/automationService');

exports.listEvents = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.category) {
      filters.category = req.query.category;
    }
    const events = await Event.find(filters)
      .populate('rsvps.contact')
      .populate('attendance.contact')
      .populate('sponsorships.contact')
      .sort({ startDate: -1 });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate('rsvps.contact')
      .populate('attendance.contact')
      .populate('sponsorships.contact');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
};

exports.upsertRsvp = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const existing = event.rsvps.find((item) => item.contact.toString() === req.body.contact);
    if (existing) {
      existing.status = req.body.status || existing.status;
      existing.guests = req.body.guests ?? existing.guests;
      existing.notes = req.body.notes ?? existing.notes;
    } else {
      event.rsvps.push({
        contact: req.body.contact,
        status: req.body.status || 'invited',
        guests: req.body.guests || 0,
        notes: req.body.notes || '',
      });
    }
    await event.save();
    res.json(event);
  } catch (error) {
    next(error);
  }
};

exports.logAttendance = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const attendance = event.attendance.find((entry) => entry.contact.toString() === req.body.contact);
    if (attendance) {
      attendance.checkedInAt = req.body.checkedInAt || new Date();
      attendance.followUpStatus = req.body.followUpStatus || attendance.followUpStatus;
      attendance.followUpActions = req.body.followUpActions || attendance.followUpActions;
    } else {
      event.attendance.push({
        contact: req.body.contact,
        checkedInAt: req.body.checkedInAt || new Date(),
        followUpStatus: req.body.followUpStatus || 'pending',
        followUpActions: req.body.followUpActions || generateFollowUpTasks(event),
      });
    }
    await event.save();
    res.json(event);
  } catch (error) {
    next(error);
  }
};

exports.addSponsorship = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    event.sponsorships.push(req.body);
    await event.save();
    res.json(event);
  } catch (error) {
    next(error);
  }
};
