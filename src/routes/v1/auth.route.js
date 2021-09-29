import express from 'express';
import validate from '../../middlewares/validate.js';
import authValidation from '../../validations/auth.validation.js';
import { AuthController } from '../../controllers/index.js';

const router = express.Router();

router.post('/register', validate(authValidation.register), AuthController.register);
router.post('/login', validate(authValidation.login), AuthController.login);

export default router;
