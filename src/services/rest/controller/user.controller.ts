import userModel from '../model/user.model';
import {Request,Response} from 'express';
import {setUser} from '../service/auth.stateless';
import bcrypt from 'bcrypt';

export async function registerHandler(req:Request,res:Response){

    try{

        const {name,email,password}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(password,salt);

        await userModel.create({
            name,
            email,
            password:hash,
        });
    
        return res.status(201).render('login');
    }catch(err){
        return res.status(500).render('register',{message:err});
    }

}
export async function loginHandler(req:Request,res:Response){

    try{

        const {email,password}=req.body;
    
        const user=await userModel.findOne({email});
    
        if(!user){
            return res.status(401).render('login',{error:'Invalid username or password'});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).render('login',{error:'Invalid username or password'});
        }
        const token=setUser({_id:user._id,email:user.email});
        res.cookie('uid',token,{signed:true});
        return res.redirect('/api/home');
    }catch(err){
        res.status(500).render('login',{error:err});
    }

}