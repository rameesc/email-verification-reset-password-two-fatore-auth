import mongoose from "mongoose"



const resetSchema=new mongoose.Schema({

    email:{
        type:String,
        unique:true
    },
    token:{
        type:String
    },
    expire:{
        type:Date
    }
})

export const ResetPassword=mongoose.models?.ResetPassword  || mongoose.model("ResetPassword",resetSchema)