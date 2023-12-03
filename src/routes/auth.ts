import express from 'express';
import validation from '../validation/auth';
import auth from '../controllers/auth';

const routes = express.Router()

routes.post('/', validation.login, auth.login);

export default routes;
