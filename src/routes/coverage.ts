import express from 'express';
import Coverage from '../controllers/coverage';
import validation from '../validation/coverage';
import routes from './user';

const router = express.Router();

routes.post('/', validation.coverage, Coverage.create);
routes.get('/', Coverage.getAll);
routes.get('/:coverageId', validation.id, Coverage.getOne);
routes.patch('/:coverageId', validation.id, validation.coverage, Coverage.update);
routes.delete('/:coverageId', validation.id, Coverage.delete);

export default router;
