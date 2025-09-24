import { Request, Response } from 'express';
import {
  createContact,
  deleteContact,
  findContacts,
  updateContact
} from '../modules/networking/contactService.js';

export const createContactHandler = async (req: Request, res: Response) => {
  try {
    const contact = await createContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updateContactHandler = async (req: Request, res: Response) => {
  try {
    const updated = await updateContact(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const listContactsHandler = async (req: Request, res: Response) => {
  try {
    const contacts = await findContacts({
      categories: req.query.categories ? String(req.query.categories).split(',') : undefined,
      tags: req.query.tags ? String(req.query.tags).split(',') : undefined,
      search: req.query.search ? String(req.query.search) : undefined
    });

    res.json(contacts);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteContactHandler = async (req: Request, res: Response) => {
  try {
    await deleteContact(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
