import { model, Schema } from 'mongoose';

interface IUser {
    _id?: string
    username: string
    password: string
    role: string
}

const schema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
})

export default model<IUser>('user', schema, 'users')
