import mongoose  from "mongoose";



const twoFactorTokenSchema=new mongoose.Schema({

    token:{
        type:String
    },
    expire:{
        type:Date
    },
    email:{
        type:String,
        unique:true
    }

    
})

const twoFactorConfirmation=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

export const TwoFactorToken=mongoose.models?.TwoFactorToken || mongoose.model("TwoFactorToken",twoFactorTokenSchema)
export const TwoFactorConfirmation=mongoose.models?.TwoFactorConfirmation || mongoose.model("TwoFactorConfirmation",twoFactorConfirmation)