import { Router } from 'express';
import { listar, obtener, crear, actualizar, eliminar } from '../controllers/product.controllers.js';
import { verificarToken } from '../middlewares/auth.js';

const router = Router();

router.get('/', listar);
router.get('/:id', obtener);
router.post('/', verificarToken, crear);
router.put('/:id', verificarToken, actualizar);
router.delete('/:id', verificarToken, eliminar);

export default router;