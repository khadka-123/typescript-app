import express from 'express';
import {loginHandler,registerHandler} from '../controller/user.controller';

const router=express.Router();

router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/register',(req,res)=>{
    res.render('register');
})

router.get('/logout',(req,res)=>{
    res.redirect('/api/login');
})

router.post('/login',loginHandler);
router.post('/register',registerHandler);

export default router;