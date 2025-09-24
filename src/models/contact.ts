import mongoose, { Schema, Document, Types } from 'mongoose';

export type ContactCategory =
  | 'broker'
  | 'vendor'
  | 'sponsor'
  | 'professional'
  | 'family'
  | 'investor'
  | 'client'
  | 'other';

export interface ContactDocument extends Document {
  firstName: string;
  lastName: string;
  company?: string;
  email?: string;
  phone?: string;
  categories: ContactCategory[];
  tags: string[];
  notes?: string;
  ownerId?: Types.ObjectId;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<ContactDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    categories: {
      type: [String],
      default: ['other'],
      enum: ['broker', 'vendor', 'sponsor', 'professional', 'family', 'investor', 'client', 'other']
    },
    tags: { type: [String], default: [] },
    notes: { type: String },
    ownerId: { type: Schema.Types.ObjectId, ref: 'Contact' },
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

ContactSchema.index({ lastName: 1, firstName: 1 });
ContactSchema.index({ tags: 1 });
ContactSchema.index({ categories: 1 });
ContactSchema.index({ firstName: 'text', lastName: 'text', company: 'text', tags: 'text' });

export const ContactModel = mongoose.model<ContactDocument>('Contact', ContactSchema);
