import { Request, Response } from 'express';
import {
  addRsvp,
  addSponsor,
  createEvent,
  recordAttendance,
  scheduleFollowUp
} from '../modules/networking/eventService.js';

export const createEventHandler = async (req: Request, res: Response) => {
  try {
    const event = await createEvent({ ...req.body, createdBy: req.body.createdBy });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const addRsvpHandler = async (req: Request, res: Response) => {
  try {
    const updated = await addRsvp(req.params.id, req.body.contactId, req.body.status, req.body.guestCount);
    if (!updated) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const recordAttendanceHandler = async (req: Request, res: Response) => {
  try {
    const updated = await recordAttendance(req.params.id, req.body.attendeeIds ?? []);
    if (!updated) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const scheduleFollowUpHandler = async (req: Request, res: Response) => {
  try {
    const updated = await scheduleFollowUp(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const addSponsorHandler = async (req: Request, res: Response) => {
  try {
    const updated = await addSponsor(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
