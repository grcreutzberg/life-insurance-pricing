/**
 * Arquivo de rotas para manipulação de usuários.
 * @module routes/user
 */

import express from 'express';
import User from '../controllers/user';
import validation from '../validation/user';
import auth from '../validation/auth';
import { expressjwt } from 'express-jwt';

const routes = express.Router()

// Middleware para validar o token JWT
const authenticate = expressjwt({ secret: 'TbuMXeL8WN6XS3Cn', algorithms: ['HS256'] });

/**
 * Rota para criar um novo usuário.
 * @name POST /
 * @function
 * @memberof module:routes/user
 * @param {string} path - O caminho da rota.
 * @param {Function} middleware - Middleware para autenticação do token JWT.
 * @param {Function} middleware - Middleware para autenticação de administrador.
 * @param {Function} middleware - Middleware para validação dos dados do usuário.
 * @param {Function} handler - Função de controle para criar um novo usuário.
 */
routes.post('/', authenticate, auth.admin, validation.user, User.create);

/**
 * Rota para obter todos os usuários.
 * @name GET /
 * @function
 * @memberof module:routes/user
 * @param {string} path - O caminho da rota.
 * @param {Function} middleware - Middleware para autenticação do token JWT.
 * @param {Function} middleware - Middleware para autenticação de administrador.
 * @param {Function} handler - Função de controle para obter todos os usuários.
 */
routes.get('/', authenticate, auth.admin, User.getAll);

/**
 * Rota para obter um usuário específico.
 * @name GET /:userId
 * @function
 * @memberof module:routes/user
 * @param {string} path - O caminho da rota.
 * @param {Function} middleware - Middleware para autenticação do token JWT.
 * @param {Function} middleware - Middleware para autenticação de administrador.
 * @param {Function} middleware - Middleware para validação do ID do usuário.
 * @param {Function} handler - Função de controle para obter um usuário específico.
 */
routes.get('/:userId', authenticate, auth.admin, validation.id, User.getOne);

/**
 * Rota para atualizar um usuário específico.
 * @name PATCH /:userId
 * @function
 * @memberof module:routes/user
 * @param {string} path - O caminho da rota.
 * @param {Function} middleware - Middleware para autenticação do token JWT.
 * @param {Function} middleware - Middleware para autenticação de administrador.
 * @param {Function} middleware - Middleware para validação do ID do usuário.
 * @param {Function} middleware - Middleware para validação dos dados de atualização do usuário.
 * @param {Function} handler - Função de controle para atualizar um usuário específico.
 */
routes.patch('/:userId', authenticate, auth.admin, validation.id, validation.update, User.update);

/**
 * Rota para excluir um usuário específico.
 * @name DELETE /:userId
 * @function
 * @memberof module:routes/user
 * @param {string} path - O caminho da rota.
 * @param {Function} middleware - Middleware para autenticação do token JWT.
 * @param {Function} middleware - Middleware para autenticação de administrador.
 * @param {Function} middleware - Middleware para validação do ID do usuário.
 * @param {Function} handler - Função de controle para excluir um usuário específico.
 */
routes.delete('/:userId', authenticate, auth.admin, validation.id, User.delete);

export default routes;
