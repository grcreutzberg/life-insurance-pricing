import * as yup from 'yup';
import mongoose from 'mongoose';
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

      const token = jwt.sign({ userId: user._id }, "TbuMXeL8WN6XS3Cn", { expiresIn: "1h" });

      return res.status(200).json({
        data: {
          user: {
            userId: user._id,
            username: req.body.username,
            role: user.role
          },
          token
        }
      });
    } catch (err) {
      const { errors } = err as yup.ValidationError
      return res.status(400).json({
        error: {
          code: '400',
          message: errors
        }
      });
    }
  }
}
