import { Request, Response } from 'express';
import User from '../models/user';

export default {
    create: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = await User.create(req.body)

            return res.status(201).json({
                data: {
                    userId: id,
                    username: req.body.username,
                    role: req.body.role,
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
    },
    getOne: async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await User.findOne({ _id: req.params.userId })

            if (!user || !user?.id) {
                return res.status(404).json({
                    error: {
                        code: '404',
                        message: 'User not found'
                    }
                });
            }

            return res.status(200).json({
                data: {
                    userId: user.id,
                    username: user.username,
                    role: user.role,
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

    },
    getAll: async (req: Request, res: Response): Promise<Response> => {
        try {
            const users = await User.find()

            if (users.length === 0) {
                return res.status(404).json({
                    error: {
                        code: '404',
                        message: 'No users to return'
                    }
                });
            }

            return res.status(200).json({
                data: {
                    users: users.map((user) => ({
                        userId: user.id,
                        username: user.username,
                        role: user.role,
                    }))
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
    },
    update: async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })

            if (!user || !user?.id) {
                return res.status(404).json({
                    error: {
                        code: '404',
                        message: 'User not found'
                    }
                });
            }

            return res.status(200).json({
                data: {
                    userId: user.id,
                    username: user.username,
                    role: user.role,
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
    },
    delete: async (req: Request, res: Response): Promise<Response> => {
        try {
            console.log(req.params)
            const user = await User.findOne({ _id: req.params.userId })
            if (!user || !user?.id) {
                return res.status(404).json({
                    error: {
                        code: '404',
                        message: 'User not found'
                    }
                });
            }

            await User.deleteOne({ _id: user._id })
            return res.status(200).json({
                data: {
                    userId: user.id,
                    username: user.username,
                    role: user.role,
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
    },
}
