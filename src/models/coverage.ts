import { model, Schema } from 'mongoose';

interface ICoverage {
    _id?: string
    name: string
    description: string
    capital: string
    premium: string
    active: boolean
}

const schema = new Schema<ICoverage>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    capital: { type: String, required: true },
    premium: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
})

export default model<ICoverage>('coverage', schema, 'coverages')
