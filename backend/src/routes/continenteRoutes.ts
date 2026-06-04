import { Router } from 'express';
import { listar, obter, criar, atualizar, excluir, listarTodos } from '../controllers/continenteController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.get('/todos', listarTodos);
router.get('/', listar);
router.get('/:id', obter);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', excluir);

export default router;
