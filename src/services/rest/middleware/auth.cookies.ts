import {Request,Response,NextFunction} from 'express';
import {verifyUser} from '../service/auth.stateless';
import userModel from '../model/user.model'

export async function restrictToLoggedInUserOnly(req:Request,res:Response,next:NextFunction){

    const token=req.signedCookies?.uid;

    if(!token) return res.redirect('/api/login');

    const payload= verifyUser(token);

    if(!payload) return res.redirect('/api/login');

    const user=await userModel.findById(payload._id);
    if(!user) return res.redirect('api/login');

    req.user=user;
    next();
}

