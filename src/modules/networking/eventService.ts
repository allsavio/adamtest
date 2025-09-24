import { Types } from 'mongoose';
import { EventDocument, EventModel, EventFollowUp, EventSponsor } from '../../models/event.js';

export interface CreateEventPayload
  extends Pick<EventDocument, 'name' | 'type' | 'description' | 'location' | 'startDate' | 'endDate'> {
  createdBy: string;
}

export const createEvent = async (payload: CreateEventPayload): Promise<EventDocument> => {
  const event = new EventModel({
    ...payload,
    createdBy: new Types.ObjectId(payload.createdBy)
  });
  return event.save();
};

export const addRsvp = async (
  eventId: string,
  contactId: string,
  status: 'invited' | 'going' | 'interested' | 'declined' | 'waitlist',
  guestCount = 0
): Promise<EventDocument | null> => {
  return EventModel.findByIdAndUpdate(
    eventId,
    {
      $push: {
        rsvps: {
          contact: new Types.ObjectId(contactId),
          status,
          guestCount,
          responseDate: new Date()
        }
      }
    },
    { new: true }
  );
};

export const recordAttendance = async (
  eventId: string,
  attendeeIds: string[]
): Promise<EventDocument | null> => {
  return EventModel.findByIdAndUpdate(
    eventId,
    {
      $addToSet: {
        attendees: {
          $each: attendeeIds.map((id) => new Types.ObjectId(id))
        }
      }
    },
    { new: true }
  );
};

export const scheduleFollowUp = async (
  eventId: string,
  followUp: Omit<EventFollowUp, 'contact'> & { contact: string }
): Promise<EventDocument | null> => {
  const payload: EventFollowUp = {
    ...followUp,
    contact: new Types.ObjectId(followUp.contact)
  };

  return EventModel.findByIdAndUpdate(
    eventId,
    {
      $push: {
        followUps: payload
      }
    },
    { new: true }
  );
};

export const addSponsor = async (
  eventId: string,
  sponsor: Omit<EventSponsor, 'sponsor'> & { sponsor: string }
): Promise<EventDocument | null> => {
  const payload: EventSponsor = {
    ...sponsor,
    sponsor: new Types.ObjectId(sponsor.sponsor)
  };

  return EventModel.findByIdAndUpdate(
    eventId,
    {
      $push: {
        sponsors: payload
      }
    },
    { new: true }
  );
};
