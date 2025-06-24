import {Request,Response,NextFunction} from 'express';
import {verifyUser} from '../service/auth.stateless';
import userModel from '../model/user.model'

export async function checkForAuthentication(req:Request,res:Response,next:NextFunction){
    const authorizationHeaderValue=req.headers['authorization'];
    req.user=null;

    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")) return next();

    const token=authorizationHeaderValue.split("Bearer")[1];
    const payload=verifyUser(token);
    if(!payload) return res.redirect('/api/login');//

    const user=await userModel.findById(payload._id);//
    if(!user) return res.redirect('api/login');//

    req.user=user;
    return next();
}

export function restrictTo(roles=[]){
    return function(req:Request,res:Response,next:NextFunction){
        if(!req.user) return res.redirect('/api/login');

        if(roles.includes(req.user.role)) return res.end('Unauthorized');

        return next();
    }
}

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

