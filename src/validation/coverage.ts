import * as yup from 'yup';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Coverage from '../models/coverage';
import { get } from 'http';

export default {
  coverage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.name || !req.body.description || !req.body.capital || !req.body.premium) {
        const requiredFields = ['name', 'description', 'capital', 'premium'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        const missingFieldsMessage: string = missingFields.join(', ');
        return res.status(400).json({
          error: {
            code: '400',
            message: `Missing required fields (${missingFieldsMessage})`
          }
        });
      }
      if (await Coverage.findOne({ name: req.body.name })) {
        return res.status(400).json({
          error: {
            code: '400',
            message: 'Coverage name already exists'
          }
        });
      }
      if (req.body.capital / 10 % 1 === 0) {
        return res.status(400).json({
          error: {
            code: '400',
            message: 'Capital must be a multiple of 10'
          }
        });
      }

      const schema = yup.object().shape({
        name: yup.string().required().min(1, 'Name minimum size is 1'),
        description: yup.string().required().min(1, 'Description minimum size is 1'),
        capital: yup.number().required().min(4, 'Capital minimum size is 4').positive('Capital to be a positive value').moreThan(999, 'Capital to be more than 999'),
        premium: yup.number().required().min(1, 'Premium minimum size is 1').positive('Premium to be a positive value').moreThan(0, 'Premium to be more than 0').lessThan((req.body.capital * 0.3), 'Premium to be less than 30% of capital'),
      });

      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (err) {
      const { errors } = err as yup.ValidationError
      return res.status(500).json({
        error: {
          code: '500',
          message: errors || err.message
        }
      });
    }
  },
  id: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.coverageId))
        return res
          .status(400).json({
            error: {
              code: '400',
              message: 'Id must be a valid MongoDB CoverageId'
            }
          });

      return next();
    } catch (err) {
      const { errors } = err as yup.ValidationError
      return res.status(500).json({
        error: {
          code: '500',
          message: errors || err.message
        }
      });
    }
  },
}
