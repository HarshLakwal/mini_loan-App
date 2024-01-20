import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userLoanTermsSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    loans: [
        {
            terms: [],
            isPaid: { type: Boolean, default: false },
            isLoanApproved: { type: Boolean, default: false },
        }
    ],
}, { timestamps: true });


export default mongoose.model('userLoanTerm', userLoanTermsSchema);       