import { Router } from 'express';
import { listar, crear } from '../controllers/resenas.controller.js';

const router = Router();

router.get('/', listar);
router.post('/', crear);

export default router;