import mongoose, { Schema, Document, Types } from 'mongoose';

export type EventType = 'topgolf' | 'poker-night' | 'wine-tasting' | 'retreat' | 'training' | 'other';

export interface EventSponsor {
  sponsor: Types.ObjectId;
  contributionType: 'financial' | 'in-kind';
  amount?: number;
  notes?: string;
}

export interface EventRsvp {
  contact: Types.ObjectId;
  status: 'invited' | 'going' | 'interested' | 'declined' | 'waitlist';
  guestCount: number;
  responseDate: Date;
}

export interface EventFollowUp {
  contact: Types.ObjectId;
  notes: string;
  dueDate?: Date;
  completedAt?: Date;
}

export interface EventDocument extends Document {
  name: string;
  type: EventType;
  description?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  createdBy: Types.ObjectId;
  rsvps: EventRsvp[];
  attendees: Types.ObjectId[];
  followUps: EventFollowUp[];
  sponsors: EventSponsor[];
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<EventDocument>(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ['topgolf', 'poker-night', 'wine-tasting', 'retreat', 'training', 'other'],
      default: 'other'
    },
    description: { type: String },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
    rsvps: [
      {
        contact: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
        status: {
          type: String,
          enum: ['invited', 'going', 'interested', 'declined', 'waitlist'],
          default: 'invited'
        },
        guestCount: { type: Number, default: 0 },
        responseDate: { type: Date, default: Date.now }
      }
    ],
    attendees: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
    followUps: [
      {
        contact: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
        notes: { type: String, required: true },
        dueDate: { type: Date },
        completedAt: { type: Date }
      }
    ],
    sponsors: [
      {
        sponsor: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
        contributionType: { type: String, enum: ['financial', 'in-kind'], required: true },
        amount: { type: Number },
        notes: { type: String }
      }
    ],
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

EventSchema.index({ startDate: 1 });
EventSchema.index({ type: 1 });
EventSchema.index({ 'rsvps.status': 1 });

export const EventModel = mongoose.model<EventDocument>('Event', EventSchema);
