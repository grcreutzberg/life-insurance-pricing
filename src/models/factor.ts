import { model, Schema } from 'mongoose';

interface IFactor {
    age: string
    factor: string
}

const schema = new Schema<IFactor>({
    age: { type: String, required: true },
    factor: { type: String, required: true },
})

export default model<IFactor>('factor', schema, 'factors')
