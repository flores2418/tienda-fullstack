import { Router } from 'express';
import { registro, login } from '../controllers/auth.controller.js';

const router = Router();

// Las dos son públicas: todavía no hay sesión, así que no piden token
router.post('/registro', registro);
router.post('/login', login);

export default router;