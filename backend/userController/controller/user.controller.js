import joi from "joi";
import userModel from "../model/user.model.js"
import CostumErrorHandler from "../../services/custumErrorHandler.js";
import bcrypt from 'bcrypt'
import userLoanTermsModel from "../model/userLoanTerms.model.js";
import customErrorHandler from "../../services/custumErrorHandler.js";

const userController = {
    async profile(req, res, next) {
        try {
            const userData = await userModel
                .findById(req.user._id)
                .select("-password -updatedAt -__v");
            if (!userData) {
                return next(CostumErrorHandler.notFound());
            }
            res.status(200).json({ result: userData });
        } catch (err) {
            return next(err);
        }
    },
    async createLoan(req, res, next) {
        const inputSenitizer = joi.object({
            loanAmount: joi.number().required(),
            loanTerm: joi.number().required(),
        });
        const { error } = inputSenitizer.validate(req.body);
        if (error) {
            return next(error);
        }
        let termWeeks = []
        let loanCount = 1
        try {
            const userId = req.user._id
            const { loanAmount, loanTerm } = req.body;

            //functions for calculate terms
            const termAmountCalculate = (loanAmount, loanTerm) => {
                return loanAmount / loanTerm
            }

            // formate the date and calculate weeks according to terms
            for (let i = 0; i <= loanTerm; i++) {
                let today = new Date();
                today.setDate(today.getDate() + 7 * i);
                termWeeks.push(today)
            }

            let amount = termAmountCalculate(loanAmount, loanTerm) // calling functions
            let termAmount = amount.toFixed(2) // taking 2 digites after decimal

            const data = [];
            // logic for add dynamic loan terms dates
            for (let i = 1; i <= loanTerm; i++) {
                const term = {
                    date: termWeeks[i],
                    payment: termAmount,
                    paymentStatus: false
                };
                data.push({ term });
            }
            const userLoanData = await userLoanTermsModel.findOne({ userId: userId });

            let createLoan;

            // checking user loan already exits ?
            if (!userLoanData) {
                createLoan = new userLoanTermsModel({
                    userId: userId,
                    loans: [
                        {
                            terms: data
                        }
                    ]
                });
            } else {
                createLoan = userLoanData;
                createLoan.loans.push({ terms: data });
            }

            const updatedLoan = await createLoan.save(); //save data

            if (!updatedLoan) {
                return next(customErrorHandler.ServerError());
            } // any error occure

            await userModel.updateOne({ _id: userId }, { $inc: { totalLoans: loanCount } }); // count +1 on every add loan
            res.json({status: true, message: "Thank for applying for our loan" })
        }
        catch (error) {
            console.log(error)
            return next(error)
        }
    },

    async repayment(req, res, next) {
        const inputSanitizer = joi.object({
            loanId: joi.string().required(),
            termDate: joi.string().required(),
            repaymentAmount: joi.number().required(),
        });
        const { error } = inputSanitizer.validate(req.body);
        if (error) {
            return next(error);
        }
        const userId = req.user._id;
        const { loanId, termDate } = req.body;
        const incrementScore = 10
        const decrementScore = -10
        try {
            const userLoanData = await userLoanTermsModel.findOne(
                { userId: userId, 'loans._id': loanId },
                { 'loans.$': 1 }
            );

            if (!userLoanData) {
                return next(customErrorHandler.notFound());
            }

            if (!userLoanData.loans[0].isLoanApproved) {
                return next(customErrorHandler.notAprroved());
            }


            const newDate = new Date(termDate) // convert in date object
            const serverDate = userLoanData.loans[0].terms[0].term.date // server repayment date
            
            //update user's payment status
            const result = await userLoanTermsModel.updateOne(
                {
                    'loans.terms': { $elemMatch: { 'term.date': newDate } },
                },
                {
                    $set: { 'loans.$[element].terms.$[term].term.paymentStatus': true },
                },
                {
                    arrayFilters: [{ 'element._id': loanId }, { 'term.term.date': newDate }],
                }
            );
            if (result.modifiedCount === 1) {
                // Fetch userLoanData after the update
                const userLoanDataAfterUpdate = await userLoanTermsModel.findOne(
                    { userId: userId, 'loans._id': loanId },
                    { 'loans.$': 1 }
                );
                const isLoanPaymentCompleted = userLoanDataAfterUpdate.loans[0].terms.every((data) => data.term.paymentStatus === true)
                if (isLoanPaymentCompleted) {
                    await userLoanTermsModel.updateOne({ userId: userId, 'loans._id': loanId }, { $set: { 'loans.$.isPaid': true } })
                }
            }

            // logic to update user's credit score
            
            if (new Date() <= newDate ) {
                console.log("inc")
                await userModel.updateOne({ _id: userId }, { $inc: { creditScore: incrementScore } })
            }
            else {
                console.log("dec")
                await userModel.updateOne({ _id: userId }, { $inc: { creditScore: decrementScore } })
            }

            if (!result) {
                return next(customErrorHandler.ServerError());
            }
            res.json({ status: true, message: "Payment success" });
        } catch (err) {
            console.log(err)
            return next(err);
        }
    },

    async getMyLoans(req, res, next) {
        const userId = req.user._id;
        const loans = await userLoanTermsModel.findOne({ userId: userId }).populate("userId")
        if (!loans) {
            return next(customErrorHandler.notFound())
        }
        res.json({ status: true, data: loans })
    },

    async getMyLoan(req, res, next) {
        const inputSanitizer = joi.object({
            termId: joi.string().required(),
        });
        const { error } = inputSanitizer.validate(req.query);
        if (error) {
            return next(error);
        }
        const userId = req.user._id;  
        const { termId } = req.query
        const term = await userLoanTermsModel.findOne({ userId: userId, 'loans._id': termId }, { 'loans.$': 1 });
        if (!term) {
            return next(customErrorHandler.notFound())
        }
        res.json({ status: true, term })
    }
}

export default userController;