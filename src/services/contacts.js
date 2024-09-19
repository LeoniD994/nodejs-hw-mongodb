import Contact from '../models/contact.js';

export const updateContactService = async (contactId, contactData) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    contactData,
    { new: true },
  );
  return updatedContact;
};

export const createContactService = async (contactData) => {
  const newContact = await Contact.create(contactData);

  return newContact;
};

export const deleteContactService = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);

  return deletedContact;
};

const getAllContacts = async () => {
  return await Contact.find();
};

export default {
  getAllContacts,
};
export const getContactByIdService = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw error;
  }
};
