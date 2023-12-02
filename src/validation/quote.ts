import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import Ocuppation from '../models/occupations';
import Coverage from '../models/coverage';

export default {
  async quote(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.age || !req.body.occupationCode || !req.body.capital || !req.body.coverages) {
        const requiredFields = ['age', 'occupationCode', 'capital', 'coverages'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        const missingFieldsMessage: string = missingFields.join(', ');
        return res.status(400).json({
          error: {
            code: '400',
            message: `Missing required fields (${missingFieldsMessage})`
          }
        });
      }

      if (req.body.occupationCode) {
        const occupation = await Ocuppation.findOne({ Code: req.body.occupationCode });
        if (!occupation) {
          return res.status(400).json({
            error: {
              code: '400',
              message: `Occupation not found`
            }
          });
        }
        if (occupation.Active !== 'TRUE') {
          return res.status(400).json({
            error: {
              code: '400',
              message: `Occupation not active`
            }
          });
        }
      }

      if (req.body.coverages.length > 0) {
        await req.body.coverages.forEach(async (item: any) => {
          if (!item.name) {
            return res.status(400).json({
              error: {
                code: '400',
                message: `Missing coverage name`
              }
            });
          }

          const coverage = await Coverage.findOne({ name: item.name });
          if (!coverage) {
            return res.status(400).json({
              error: {
                code: '400',
                message: `Coverage "${item.name}" not found`
              }
            });
          }
          if (coverage.active !== true) {
            return res.status(400).json({
              error: {
                code: '400',
                message: `Coverage "${item.name}" not active`
              }
            });
          }
        });

        const schema = yup.object().shape({
          age: yup.number().required().positive().moreThan(17, 'Age to be more than 17').lessThan(61, 'Age to be less than 61'),
          occupationCode: yup.number().required().positive(),
          capital: yup.number().required().positive().moreThan(9999, 'Capital to be more than 9999').lessThan(10000001, 'Capital to be less than 10000001'),
          coverages: yup.array().of(
            yup.object().shape({
              name: yup.string().required()
            })
          ).required().min(1, 'At least one coverage is required'),
        });

        await schema.validate(req.body, { abortEarly: false })
          .then(() => next())
          .catch((err) => {
            const { errors } = err as yup.ValidationError
            return res.status(400).json({
              error: {
                code: '400',
                message: errors || err.message
              }
            });
          });
      }
    } catch (err) {
      const { errors } = err as yup.ValidationError
      return res.status(500).json({
        error: {
          code: '500',
          message: errors || err.message
        }
      });
    }
  }
}
