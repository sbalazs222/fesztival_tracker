import express from 'express';

import { login, register, logout } from '../controllers/authController.js';
import { validateFieldCount, validateRequiredFields}  from "psgutil";

const router = express.Router();

router.post('/register', validateFieldCount(3), validateRequiredFields(['username', 'password']), register);
router.post('/login', validateFieldCount(2), validateRequiredFields(['username', 'password']), login);
router.post('/logout', logout);

export default router;