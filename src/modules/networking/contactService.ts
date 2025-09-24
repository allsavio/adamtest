import { FilterQuery } from 'mongoose';
import { ContactDocument, ContactModel } from '../../models/contact.js';

export interface ContactFilters {
  categories?: string[];
  tags?: string[];
  search?: string;
}

export const createContact = async (payload: Partial<ContactDocument>): Promise<ContactDocument> => {
  const contact = new ContactModel(payload);
  return contact.save();
};

export const updateContact = async (
  contactId: string,
  updates: Partial<ContactDocument>
): Promise<ContactDocument | null> => {
  return ContactModel.findByIdAndUpdate(contactId, updates, { new: true });
};

export const findContacts = async (filters: ContactFilters): Promise<ContactDocument[]> => {
  const query: FilterQuery<ContactDocument> = {};

  if (filters.categories?.length) {
    query.categories = { $in: filters.categories };
  }

  if (filters.tags?.length) {
    query.tags = { $all: filters.tags };
  }

  if (filters.search) {
    query.$text = {
      $search: filters.search
    };
  }

  return ContactModel.find(query).sort({ lastName: 1, firstName: 1 }).exec();
};

export const deleteContact = async (contactId: string): Promise<void> => {
  await ContactModel.findByIdAndDelete(contactId);
};
