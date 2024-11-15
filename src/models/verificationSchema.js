import mongoose from "mongoose";


const emailVerificationSchema=new mongoose.Schema({

    token:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    expire:{
        type:Date
    }
})

export const VerificationEmail=mongoose.models?.VerificationEmail  || mongoose.model("VerificationEmail",emailVerificationSchema)
