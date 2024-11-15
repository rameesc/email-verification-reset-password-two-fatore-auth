
import {TwoFactorToken} from "@/models/twofactorschema"



export const getTwoFactorTokemByEmail=async(email:string)=>{


    try{

        const twoFactoreToken=await TwoFactorToken.findOne({email})

        return twoFactoreToken


    }catch(error){
        return {error:"something wrong"}
    }

}
export const getTwoFactorTokemByToken=async(code:string)=>{


    try{

        const twoFactoreToken=await TwoFactorToken.findOne({token:code})

        return twoFactoreToken


    }catch(error){
        return {error:"something wrong"}
    }

}