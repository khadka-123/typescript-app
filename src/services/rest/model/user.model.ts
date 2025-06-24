import mongoose,{Document,Schema} from 'mongoose';

//typescript interface
export interface UserDocument extends Document{
    _id:string;
    name:string;
    email:string;
    password:string;
    createdAt:Date;
    updatedAt:Date;
}

const userSchema=new Schema<UserDocument>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const User=mongoose.model<UserDocument>('User',userSchema);

export default User;

