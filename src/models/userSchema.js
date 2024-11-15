import { ROLE } from "@/lib/userRole";
import mongoose from "mongoose";
import { boolean } from "zod";

// interface userType{
//     name:string |undefined,
//     email:string|undefined,
//     password:string|undefined,
//     image:string|undefined,
//     role:string,
//     isEmailVerified:Date |undefined
// }

const userSchema=new mongoose.Schema({

    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    image:{
        type:String
    },
    role:{
        type:String,
        enum:[ROLE.ADMIN,ROLE.USER],
        default:ROLE.USER
    },
   
    isEmailVerified:{
        type:Date
    },
  
    twoFactorConfirmation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TwoFactorToken"
    },
    isTwoFactorEnable:{
        type:Boolean,
        default:false

    }
})


export const User=mongoose.models?.User || mongoose.model("User",userSchema)