import express from 'express';
import validation from '../validation/auth';

const routes = express.Router()

routes.post('/', validation.login);

export default routes;
