import joi from 'joi'
import userLoanTermsModel from "../../userController/model/userLoanTerms.model.js";
import customErrorHandler from '../../services/custumErrorHandler.js';
import userModel from '../../userController/model/user.model.js';


const adminController = {
    async aprroveLoan(req, res, next) {
        const inputSenitizer = joi.object({
            userId: joi.string().required(),
            loanId: joi.string().required(),
            aprroved: joi.boolean().required()
        });
        const { error } = inputSenitizer.validate(req.body);
        if (error) {
            return next(error);
        }
        const adminRole = req.user.role;
        console.log(adminRole)
        if (adminRole !== 'admin') {
            return next(customErrorHandler.unAuthorized("You are not authorize to performe this action!"))
        }
        const { userId, loanId, aprroved } = req.body
        const loans = await userLoanTermsModel.findOneAndUpdate({ userId: userId, 'loans._id': loanId }, { $set: { 'loans.$.isLoanApproved': aprroved, } }, { new: true })
        if(!loans){
            return next(customErrorHandler.ServerError())
        }
        res.json({ status: true, message: 'success' }) 
    },

    async getUsers(req, res, next){
        const adminRole = req.user.role;
        if (adminRole !== 'admin') {
            return next(customErrorHandler.unAuthorized("You are not authorize to performe this action!"))
        }
        const users = await userModel.find()
        if(!users){
            return next(customErrorHandler.notFound())
        }
        res.json({status:true, data: users})
    },

    async getUserLoans(req, res, next) {
        const inputSenitizer = joi.object({
            userId: joi.string().required(),
        });
        const { error } = inputSenitizer.validate(req.query);
        if (error) {
            return next(error);
        }
        const {userId} = req.query;
        // console.log(req.query)
        const loans = await userLoanTermsModel.findOne({ 'userId': userId }).populate("userId")
        if (!loans) {
            return next(customErrorHandler.notFound())
        }
        res.json({ status: true, data: loans })
    },

    async getUserLoan(req, res, next) {
        const inputSanitizer = joi.object({
            termId: joi.string().required(),
            userId: joi.string().required(),
        });
        const { error } = inputSanitizer.validate(req.query);
        if (error) {
            return next(error);
        }
        const { termId,userId } = req.query
        const term = await userLoanTermsModel.findOne({ userId: userId, 'loans._id': termId }, { 'loans.$': 1 });
        if (!term) {
            return next(customErrorHandler.notFound())
        }
        res.json({ status: true, term })
    }
}
export default adminController 