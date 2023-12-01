import { Request, Response } from 'express'
import User from '../models/user'

export default {
    create: async (req: Request, res: Response): Promise<Response> => {
        const { id } = await User.create(req.body)

        return res.status(201).json({
            data: {
                userId: id,
                username: req.body.username,
                role: req.body.role,
            }
        });
    },
    getOne: async (req: Request, res: Response): Promise<Response> => {
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
    },
    getAll: async (req: Request, res: Response): Promise<Response> => {
        const user = await User.find()

        if(user.length === 0) {
            return res.status(404).json({
                error: {
                  code: '404',
                  message: 'No users to return'
                }
              });
        }

        return res.status(200).json({
            data: {
                users: user.map((user) => ({
                    userId: user.id,
                    username: user.username,
                    role: user.role,
                }))
            }
        });
    },
    update: async (req: Request, res: Response): Promise<Response> => {
        const user = await User.findOne({ _id: req.params.userId })
        
        if (!user || !user?.id) {
            return res.status(404).json({
                error: {
                  code: '404',
                  message: 'User not found'
                }
              });
        }

        await User.updateOne({ _id: user._id }, req.body)
        return res.status(200).json({
            data: {
                userId: user.id,
                username: user.username,
                role: req.body.role,
            }
        });
    },
    delete: async (req: Request, res: Response): Promise<Response> => {
        const user = await User.findOne({ _id: req.params.id })
        if (!user || !user?.id) {
            return res.status(404).json({
                error: {
                  code: '404',
                  message: 'User not found'
                }
              });
        }

        await User.deleteOne({ id: user.id })
        return res.status(200).json({
            data: {
                userId: user.id,
                username: user.username,
                role: user.role,
            }
        });
    },
}
