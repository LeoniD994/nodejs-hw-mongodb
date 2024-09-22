import Contact from '../models/contact.js';
import createHttpError from 'http-errors';
import {
  createContactService,
  updateContactService,
  deleteContactService,
  getContactByIdService,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const createContact = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    next(createError(400, 'Name, phoneNumber, and contactType are required.'));
  }

  const newContact = await createContactService({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactData = req.body;
  const updatedContact = await updateContactService(contactId, contactData);

  if (!updatedContact) {
    next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContactService(contactId);

  if (!deletedContact) {
    next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send();
};

export const getAllContacts = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const contacts = await Contact.find({
    page,
    perPage,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await getContactByIdService(contactId);
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
