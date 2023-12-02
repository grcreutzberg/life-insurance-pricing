import express from 'express';
import Coverage from '../controllers/coverage';
import validation from '../validation/coverage';

const router = express.Router();

router.post('/', validation.coverage, Coverage.create);
router.get('/', Coverage.getAll);
router.get('/:coverageId', validation.id, Coverage.getOne);
router.patch('/:coverageId', validation.id, validation.update, Coverage.update);
router.delete('/:coverageId', validation.id, validation.delete, Coverage.delete);

export default router;
