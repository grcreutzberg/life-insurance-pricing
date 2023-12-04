/**
 * Arquivo responsável por definir as rotas relacionadas à cobertura de seguro.
 */

import express from 'express';
import Coverage from '../controllers/coverage';
import validation from '../validation/coverage';
import { expressjwt } from 'express-jwt';
import auth from '../validation/auth';

const router = express.Router();

// Middleware para validar o token JWT
const authenticate = expressjwt({ secret: 'TbuMXeL8WN6XS3Cn', algorithms: ['HS256'] });

/**
 * Rota para criar uma nova cobertura de seguro.
 * @route POST /
 * @group Coverage - Operações relacionadas à cobertura de seguro
 * @security JWT
 * @param {Coverage} req.body - Objeto contendo os dados da cobertura de seguro a ser criada
 * @returns {Coverage} - Objeto contendo os dados da cobertura de seguro criada
 */
router.post('/', authenticate, auth.admin, validation.coverage, Coverage.create);

/**
 * Rota para obter todas as coberturas de seguro.
 * @route GET /
 * @group Coverage - Operações relacionadas à cobertura de seguro
 * @security JWT
 * @returns {Coverage[]} - Array contendo os dados de todas as coberturas de seguro
 */
router.get('/', authenticate, auth.admin, Coverage.getAll);

/**
 * Rota para obter uma cobertura de seguro específica.
 * @route GET /{coverageId}
 * @group Coverage - Operações relacionadas à cobertura de seguro
 * @security JWT
 * @param {string} coverageId.path.required - ID da cobertura de seguro a ser obtida
 * @returns {Coverage} - Objeto contendo os dados da cobertura de seguro obtida
 */
router.get('/:coverageId', authenticate, auth.admin, validation.id, Coverage.getOne);

/**
 * Rota para atualizar uma cobertura de seguro específica.
 * @route PATCH /{coverageId}
 * @group Coverage - Operações relacionadas à cobertura de seguro
 * @security JWT
 * @param {string} coverageId.path.required - ID da cobertura de seguro a ser atualizada
 * @param {Coverage} req.body - Objeto contendo os dados da cobertura de seguro a ser atualizada
 * @returns {Coverage} - Objeto contendo os dados da cobertura de seguro atualizada
 */
router.patch('/:coverageId', authenticate, auth.admin, validation.id, validation.update, Coverage.update);

/**
 * Rota para excluir uma cobertura de seguro específica.
 * @route DELETE /{coverageId}
 * @group Coverage - Operações relacionadas à cobertura de seguro
 * @security JWT
 * @param {string} coverageId.path.required - ID da cobertura de seguro a ser excluída
 * @returns {string} - Mensagem de sucesso indicando que a cobertura de seguro foi excluída com sucesso
 */
router.delete('/:coverageId', authenticate, auth.admin, validation.id, validation.delete, Coverage.delete);

export default router;
