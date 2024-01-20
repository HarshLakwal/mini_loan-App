import userModel from "../../model/user.model.js";
import bcrypt from "bcrypt";
import joi from "joi";
import CostumErrorHandler from "../../../services/custumErrorHandler.js";
import JWTService from "../../../services/JWTService.js";

const loginController = {
  async userLogin(req, res, next) {
    const inputSenitizer = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });
    const { error } = inputSenitizer.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return next(CostumErrorHandler.wrongCredentails());
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CostumErrorHandler.wrongCredentails());
      }
      //   if (!user.isVerify) {
      //     return next(CostumErrorHandler.verify())
      //   }
      let userToken = JWTService.sign({ _id: user._id, role: user.role });
      res.status(200)
        .json({ status: true, result: "Login Success", token: userToken, user });
    } catch (err) {
      return next(err);
    }
  },
}

export default loginController