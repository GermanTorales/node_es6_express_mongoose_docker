import express from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import userValidation from '../../validations/user.validation.js';
import { UserController } from '../../controllers/index.js';

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(userValidation.createUser), UserController.createUser)
  .get(auth('getUsers'), validate(userValidation.getUsers), UserController.getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), UserController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), UserController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), UserController.deleteUser);

export default router;
