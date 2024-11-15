
import { MdError } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";

interface errorProps{
    message:string
}


export const SuccessItema=({message}:errorProps)=>{

    if(!message){
        return null
    }

    return(
        <div className="flex bg-green-300 gap-2  items-center p-1 rounded-md">
            <FaRegThumbsUp className="text-green-600"/>
            <p className="text-green-600">{message}</p>
        </div>
    )

}