import { Router } from 'express';
import { listar, obter, criar, atualizar, excluir, listarPorContinente } from '../controllers/paisController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.get('/', listar);
router.get('/por-continente/:continenteId', listarPorContinente);
router.get('/:id', obter);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', excluir);

export default router;
