
import { getEmailResetPasswordToke, getEmailVerificatioTokenByEmail } from "@/data/emailVerification";
import { ResetPassword } from "@/models/resetSchema";
import { VerificationEmail } from "@/models/verificationSchema";
import { v4 as uuidv4 } from "uuid";
import { DbConnected } from "./db";
import crpto from "crypto"
import { getUserByEmail, getUserById } from "@/data/user";
import { getTwoFactorTokemByEmail } from "@/data/twoFactorToken";
import { TwoFactorToken } from "@/models/twofactorschema";

export const generateEmailVerificationToken=async(email:string)=>{

    const token=uuidv4();

    const expire=new Date(new Date().getTime()+3600*1000);

    const existingToken=await getEmailVerificatioTokenByEmail(email)

    if(existingToken){
        await VerificationEmail.findByIdAndDelete(existingToken._id)
    }

    const verificationToken=await VerificationEmail.create({
        token,
        email,
        expire
    })


    return  verificationToken



}



export const generateResetPasswordToken=async(email:string)=>{

    const token=uuidv4();

    const expire=new Date(new Date().getTime()+3600*1000)

    const tokenExisting=await getEmailResetPasswordToke(email)

    if(tokenExisting){
        await DbConnected()

        await ResetPassword.findByIdAndDelete(tokenExisting._id)


    }

   const cerateToken= await ResetPassword.create({
        email,
        token,
        expire
    })

    return cerateToken

}

export const generateTwoFactorToken=async(email:string)=>{

    const token=crpto.randomInt(100_000,100_00_00)

    const expire=new Date(new Date().getTime()+5000*60)

    const exstingToken=await getTwoFactorTokemByEmail(email)

    if(exstingToken){

        await TwoFactorToken.findByIdAndDelete(exstingToken._id)
    }

    const createToken=await TwoFactorToken.create({
        token,
        email,
        expire
    })


    return createToken
            
    

}