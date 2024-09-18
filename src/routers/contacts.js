import { Router } from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.patch('/contacts/:contactId', ctrlWrapper(updateContact));
router.post('/contacts', ctrlWrapper(createContact));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContact));
router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContactById));

export default router;
