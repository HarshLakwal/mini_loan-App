import CostumErrorHandler from '../services/custumErrorHandler.js';
import JWTService from '../services/JWTService.js';

 const auth = async (req,res,next)=>{
    let authHeader = req.headers.authorization;
    if(!authHeader){
        return next (CostumErrorHandler.unAuthorized())
    }
    const token = authHeader.split(' ')[1]
   
    try{
        const {_id , role }= await JWTService.verify(token);
        const user={
            _id,
            role
        }
        req.user = user;
        next()
    }  
    catch(err){
        console.log(err) 
        return next(CostumErrorHandler.unAuthorized())
    }
}
export default auth;