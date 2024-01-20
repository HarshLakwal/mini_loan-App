import CustumErrorHandler from "../../../services/custumErrorHandler.js";
import bcrypt from "bcrypt";
import joi from "joi";
import JWTService from "../../../services/JWTService.js";
import adminModel from "../../model/admin.model.js";

const registerController = {
    async userRegister(req, res, next) {
        const inputSenitizer = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required(),
          });
        const { error } = inputSenitizer.validate(req.body);
        if (error) {
          return next(error);
        }
        const exits = await adminModel.findOne({ email: req.body.email });
        if (exits) {
          return next(    
            CustumErrorHandler.alreadyExist("This email is already taken.")
          );
        }
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new adminModel({
          name,
          email,
          password: hashedPassword,
        });
        try {
          const result = await user.save();
          if (result) {
            return res.status(200).json({status:true, message: "Admin registed successfully." });
          }
          // Token
          access_token = JWTService.sign({ _id: result._id, role: result.role });
        } catch (err) {
          console.log(err);
          return next(err);
        }
      },
}

export default registerController;