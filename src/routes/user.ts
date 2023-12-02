import express from 'express';
import User from '../controllers/user';
import validation from '../validation/user';
import auth from '../validation/auth';
import { expressjwt } from 'express-jwt';

const routes = express.Router()

// Middleware para validar o token JWT
const authenticate = expressjwt({ secret: 'TbuMXeL8WN6XS3Cn', algorithms: ['HS256'] });

routes.post('/', authenticate, auth.admin, validation.user, User.create);
routes.get('/', authenticate, auth.admin, User.getAll);
routes.get('/:userId', authenticate, auth.admin, validation.id, User.getOne);
routes.patch('/:userId', authenticate, auth.admin, validation.id, validation.update, User.update);
routes.delete('/:userId', authenticate, auth.admin, validation.id, User.delete);

export default routes;
