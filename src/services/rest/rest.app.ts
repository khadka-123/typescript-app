import express,{Application} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

import restRoutes from './routes/user.routes';
import dbConnect from './config/connection';
import {notFoundHandler,globalErrorHandler} from './middleware/error.middleware'
import {restrictToLoggedInUserOnly} from './middleware/auth.cookies';

dotenv.config();

const app:Application=express();
const PORT=Number(process.env.PORT )|| 3000;
const MONGO_URL=process.env.MONGO_URL || ' ';

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

app.set('view engine','ejs');
app.set('views', path.join(process.cwd(), 'src/services/rest/views/auth'));

//restful api endpoints
app.use('/api',restRoutes);
app.use('/api', restrictToLoggedInUserOnly, restRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

dbConnect(MONGO_URL);

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})