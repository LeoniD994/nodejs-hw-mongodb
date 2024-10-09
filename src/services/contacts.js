import Contact from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const updateContactService = async (contactId, userId, contactData) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: contactData },
    { new: true },
  );
  return updatedContact;
};

export const createContactService = async (contactData) => {
  const newContact = await Contact.create(contactData);

  return newContact;
};

export const deleteContactService = async (contactId, userId) => {
  const deletedContact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return deletedContact;
};

export const getAllContactsService = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  type,
  isFavourite,
  userId,
}) => {
  const filters = { userId };

  if (type) filters.contactType = type;
  if (typeof isFavourite === 'boolean') filters.isFavourite = isFavourite;

  const totalItems = await Contact.countDocuments(filters);

  const contacts = await Contact.find(filters)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactByIdService = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });

  return contact;
};
