import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, requied: true },
    email: { type: String, requied: true, unique: true },
    password: { type: String, requied: true },
    role: { type: String, default: 'user' },
    creditScore: { type: Number, default: 0 },
    totalLoans: { type: Number, default: 0 },

}, { timestamps: true });


export default mongoose.model('user', userSchema, 'users');       