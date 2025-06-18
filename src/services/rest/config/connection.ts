import mongoose from 'mongoose';

export default async function dbConnect(MONGO_URL:string){

    try{
        await mongoose.connect(MONGO_URL);
        console.log("Connection Successfull");
    }catch(err){
        console.log("Connection failed",err);
        process.exit(1);
    }
}