import { Router } from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();
contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact),
);
contactsRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContact),
);
contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

contactsRouter.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContact),
);
contactsRouter.get('/', ctrlWrapper(getAllContacts));
contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactById));

export default contactsRouter;
