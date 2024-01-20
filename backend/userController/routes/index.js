import express from 'express';
import auth from '../../middleware/auth.js'
import {loginController, registerController, userController} from '../controller/index.js'

const routes = express.Router()
routes.post('/register',registerController.userRegister);
routes.post('/login',loginController.userLogin);
routes.post('/profile',auth,userController.profile);
routes.post('/create-loan',auth, userController.createLoan);
routes.post('/repayment',auth,userController.repayment);
routes.get('/get-my-loans',auth, userController.getMyLoans);
routes.get('/get-my-loan',auth, userController.getMyLoan);

export default routes; 