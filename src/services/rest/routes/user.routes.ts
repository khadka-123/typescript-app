import express,{Request,Response} from 'express';
import {loginHandler,registerHandler} from '../controller/user.controller';
import {UserDocument} from '../model/user.model';

const router=express.Router();

declare global{
    namespace Express{
        interface Request{
            user?:UserDocument;
        }
    }
}

router.get('/login',(req:Request,res:Response)=>{
    res.render('login');
})

router.get('/register',(req:Request,res:Response)=>{
    res.render('register');
})

router.get('/logout',(req:Request,res:Response)=>{
    res.redirect('/api/login');
})

router.get('/home',(req:Request,res:Response)=>{
    res.render('home',{user:req.user});
})

router.post('/login',loginHandler);
router.post('/register',registerHandler);

export default router;