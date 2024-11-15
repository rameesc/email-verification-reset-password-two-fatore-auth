import { DbConnected } from "@/lib/db"
import { User } from "@/models/userSchema"
import { NextResponse } from "next/server"



export const GET=async()=>{

    try{
        await DbConnected()
        const allUser=await User.find({})

     return   NextResponse.json({allUser})


    }catch(error){
      return  NextResponse.json({error:"something went wrong"})
    }
}