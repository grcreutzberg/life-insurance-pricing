import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export default {
  login: async (req: Request, res: Response): Promise<Response> => {
    const user = await User.findOne({ username: req.body.username });
    const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, 'TbuMXeL8WN6XS3Cn', { expiresIn: "2 days" });
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
  },
  logout: async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
      data: {
        message: "Logout successful"
      }
    });
  }
}
