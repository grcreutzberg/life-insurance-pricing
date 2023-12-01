import express from 'express';
import User from '../controllers/user';
import validation from '../validation/user';

const routes = express.Router()

routes.post('/', validation.user, User.create);
routes.get('/', User.getAll);
routes.get('/:userId', validation.id, User.getOne);
routes.patch('/:userId', validation.id, validation.role, User.update);
routes.delete('/:userId', validation.id, User.delete);

export default routes;
