
import { MdError } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";

interface errorProps{
    message:string |undefined
}


export const ErrorItema=({message}:errorProps)=>{

    if(!message){
        return null
    }

    return(
        <div className="flex bg-red-300 gap-2  items-center p-1 rounded-md">
            <MdError className="text-red-600"/>
            <p className="text-red-600">{message}</p>
        </div>
    )

}