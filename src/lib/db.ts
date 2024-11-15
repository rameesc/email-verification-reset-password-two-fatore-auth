

import mongoose from "mongoose";


export const DbConnected=async()=>{

    try{
        await mongoose.connect(process.env.DB_URL as string)

        console.log('successfuly connted')


    }catch(error){
        console.log(error)
    }
}