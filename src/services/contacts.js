import Contact from '../models/contact.js';

const getAllContacts = async () => {
  return await Contact.find();
};

export default {
  getAllContacts,
};
