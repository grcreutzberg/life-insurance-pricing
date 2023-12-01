import * as yup from 'yup';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

export default {
    user: async (req: Request, res: Response, next: NextFunction) => {
        try {          
            if (!req.body.username || !req.body.password) {
                return res.status(400).json({
                    error: {
                        code: '400',
                        message: 'Username and password are required'
                    }
                });
            }
            if (await User.findOne({ username: req.body.username })) {
                return res.status(400).json({
                    error: {
                        code: '400',
                        message: 'Username already exists'
                    }
                });
            }

            const schema = yup.object().shape({
                username: yup.string().required().min(1),
                password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!$%])[A-Za-z\d@#!$%]{8,64}$/),
            });

            await schema.validate(req.body, { abortEarly: false });

            return next()
        } catch (err) {
            const { errors } = err as yup.ValidationError
            return res.status(400).json({
                error: {
                    code: '400',
                    message: errors
                }
            });
        }
    },
    id: (req: Request, res: Response, next: NextFunction) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.userId))
            return res
                .status(400).json({
                    error: {
                        code: '400',
                        message: 'Id must be a valid MongoDB UserId'
                    }
                });

        return next();
    },
    role: async (req: Request, res: Response, next: NextFunction) => {
        const schema = yup.object().shape({
            role: yup.string().required().oneOf(['admin', 'user']),
        })

        await schema.validate(req.body, { abortEarly: false })
            .then(() => next())
            .catch((err) => {
                const { errors } = err as yup.ValidationError
                return res.status(400).json({
                    error: {
                        code: '400',
                        message: errors
                    }
                });
            });
    }
}
