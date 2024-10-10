import createHttpError from 'http-errors';
import {
  createContactService,
  updateContactService,
  deleteContactService,
  getAllContactsService,
  getContactByIdService,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const createContact = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const photo = req.file;

  if (!name || !phoneNumber || !contactType) {
    next(
      createHttpError(400, 'Name, phoneNumber, and contactType are required.'),
    );
  }
  let photoUrl;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const newContact = await createContactService({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
    userId: req.user._id,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const photo = req.file;
    let photoUrl;

    if (photo) {
      if (env('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    const updatedContact = await updateContactService(contactId, userId, {
      ...req.body,
      photo: photoUrl,
    });

    if (!updatedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const deletedContact = await deleteContactService(contactId, userId);

  if (!deletedContact) {
    next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send();
};

export const getAllContacts = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { type, isFavourite } = parseFilterParams(req.query);
  const { _id: userId } = req.user;

  const result = await getAllContactsService({
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: result,
  });
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const contact = await getContactByIdService(contactId, userId);

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
