import {Request,Response,NextFunction,ErrorRequestHandler} from 'express';
import createHttpError,{HttpError} from 'http-errors';

//endpoint not found -> forward to global error handler
export const notFoundHandler=(req:Request,res:Response,next:NextFunction)=>{
    next(createHttpError(404,"Route Not Found"));
}

export const globalErrorHandler:ErrorRequestHandler=(err:HttpError,req:Request,res:Response,next:NextFunction)=>{
    const status=err.status || 500;
    const message=err.message || 'Internal Server Errror';

    res.status(status).json({status,message});
}