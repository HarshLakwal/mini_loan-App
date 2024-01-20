import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: { type: String, requied: true, unique: true },
    password: { type: String, requied: true },
    role: { type: String, default: 'admin' },

}, { timestamps: true });


export default mongoose.model('admin', adminSchema);       