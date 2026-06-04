import { Router } from 'express';
import { listar, obter, criar, atualizar, excluir, listarPorPais } from '../controllers/cidadeController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.get('/', listar);
router.get('/por-pais/:paisId', listarPorPais);
router.get('/:id', obter);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', excluir);

export default router;
