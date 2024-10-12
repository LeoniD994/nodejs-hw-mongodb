import { Router } from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();
contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContacts));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactById));

contactsRouter.post('/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContact));

contactsRouter.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact),
);

contactsRouter.delete('/:contactId',
  isValidId,
  ctrlWrapper(deleteContact));

export default contactsRouter;
