import express from 'express';
import auth from '../../middleware/auth.js'
import {adminController, loginController, registerController} from '../controller/index.js'

const routes = express.Router()
routes.post('/register',registerController.userRegister);
routes.post('/login',loginController.userLogin);
routes.post('/aprrove-loan',auth, adminController.aprroveLoan); 
routes.get('/get-users',auth, adminController.getUsers);
routes.get('/get-user-loans', auth, adminController.getUserLoans)
routes.get('/get-user-loan', auth, adminController.getUserLoan)

export default routes;