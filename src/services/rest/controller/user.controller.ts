import userModel from '../model/user.model';
import {Request,Response} from 'express';

export async function registerHandler(req:Request,res:Response){

    try{

        const {name,email,password}=req.body;
        await userModel.create({
            name,
            email,
            password
        });
    
        return res.status(201).render('login');
    }catch(err){
        return res.status(500).render('register',{message:err});
    }

}
export async function loginHandler(req:Request,res:Response){

    try{

        const {email,password}=req.body;
    
        const user=await userModel.findOne({email,password});
    
        if(!user){
            return res.status(401).render('login',{error:'Invalid username or password'});
        }
    
        return res.render('home',{user:user});
    }catch(err){
        res.status(500).render('login',{error:err});
    }

}