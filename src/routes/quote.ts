/**
 * Lida com a requisição POST para calcular a cotação do seguro de vida.
 * 
 * @param req - O objeto de requisição.
 * @param res - O objeto de resposta.
 * @returns A cotação calculada do seguro de vida.
 */
import express, { Request, Response } from 'express';
import { expressjwt } from 'express-jwt';
import validation from '../validation/quote';
import Factor from '../controllers/factor';
import Occupation from '../controllers/occupations';
import Coverage from '../controllers/coverage';

const routes = express.Router()

// Middleware para validar o token JWT
const authenticate = expressjwt({ secret: 'TbuMXeL8WN6XS3Cn', algorithms: ['HS256'] });

routes.post('/', authenticate, validation.quote, async (req: Request, res: Response) => {

  const ageFactor = await Factor.getFactor(req.body.age);
  const occupationFactor = await Occupation.getFactor(req.body.occupationCode);
  const coverages = [];

  await Promise.all(req.body.coverages.map(async (item: any) => {
    const coverage = await Coverage.getOneByName(item.name);
    const calc01: number = Math.ceil(req.body.capital / parseInt(coverage.capital));
    const calc02: number = calc01 * parseInt(coverage.premium);
    const value: number = calc02 * parseFloat(ageFactor) * parseFloat(occupationFactor);
    coverages.push({
      coverageId: coverage.name,
      premium: value
    });
  }));

  return res.status(200).json({
    ageFactor: parseFloat(ageFactor),
    occupationFactor: parseFloat(occupationFactor),
    coverages: coverages,
    capital: parseFloat(req.body.capital), //OU Capital das coberturas?
    premium: coverages.reduce((acc: number, item: any) => acc + item.premium, 0)
  });
});

export default routes;
