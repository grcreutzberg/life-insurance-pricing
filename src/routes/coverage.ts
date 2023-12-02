import express from 'express';
import Coverage from '../controllers/coverage';
import validation from '../validation/coverage';
import { expressjwt } from 'express-jwt';
import auth from '../validation/auth';

const router = express.Router();

// Middleware para validar o token JWT
const authenticate = expressjwt({ secret: 'TbuMXeL8WN6XS3Cn', algorithms: ['HS256'] });

router.post('/', authenticate, auth.admin, validation.coverage, Coverage.create);
router.get('/', authenticate, auth.admin, Coverage.getAll);
router.get('/:coverageId', authenticate, auth.admin, validation.id, Coverage.getOne);
router.patch('/:coverageId', authenticate, auth.admin, validation.id, validation.update, Coverage.update);
router.delete('/:coverageId', authenticate, auth.admin, validation.id, validation.delete, Coverage.delete);

export default router;
