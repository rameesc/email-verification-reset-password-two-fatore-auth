import { DbConnected } from "@/lib/db"
import { ResetPassword } from "@/models/resetSchema"





export const getResetTokenByToken=async(token:string)=>{


    try{
        await DbConnected()

        const restPasswordToken=await ResetPassword.findOne({token})

        return restPasswordToken


    }catch(error){

        return {error:"something went wrong"}
    }

}