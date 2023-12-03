import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export default {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            error: {
                code: '400',
                message: 'Username and password are required'
            }
        });
      }

      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        return res.status(401).json({
          error: {
            code: '401',
            message: 'Username does not exist'
          }
        });
      }
      if (req.body.password != user.password) {
        return res.status(401).json({
          error: {
            code: '401',
            message: 'Password does not match'
          }
        });
      }

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
  admin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, 'TbuMXeL8WN6XS3Cn') as { role: string };
      if (decoded.role == 'admin') {
        return next();
      }
      return res.status(401).json({
        error: {
          code: '401',
          message: 'Unauthorized'
        }
      });
    } catch (err) {
      return res.status(500).json({
        error: {
          code: '500',
          message: err.message
        }
      });
    }
  }
}
