import jwt from 'jsonwebtoken';
const secret=process.env.JWT_SECRET as string;

export interface JwtPayload{
    _id:string;
    email:string;
}

function setUser(user:JwtPayload):string{

    return jwt.sign(user,secret,{expiresIn:'7d'})
}

function verifyUser(token:string):JwtPayload | null{

    if(!token) return null;

    try{
        return jwt.verify(token,secret) as JwtPayload;
    }catch{
        return null;
    }
}

export {setUser,verifyUser};

