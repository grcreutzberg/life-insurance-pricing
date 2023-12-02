import { model, Schema } from 'mongoose';

interface IOcupation {
    Code: string
    Name: string
    Active: string
    Factor: string
}

const schema = new Schema<IOcupation>({
    Code: { type: String, required: true },
    Name: { type: String, required: true },
    Active: { type: String, required: true },
    Factor: { type: String, required: true },
})

export default model<IOcupation>('ocupation', schema, 'ocupations')
