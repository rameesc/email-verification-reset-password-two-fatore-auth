

import { UserAllData } from "@/actions/useData"
import { ErrorItema } from "@/components/Error-popap"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getUser } from "@/lib/getUser"
import { ROLE } from "@/lib/userRole"
import { RemoveUserBtn } from "./RemoveUserBtn"
import { any } from "zod"
import axios from "axios"


export const UserTable=async()=>{

    const user=await getUser()

    // if(user.role!==ROLE.ADMIN){
    //     return <ErrorItema message="this route access only admin"/>
    // }

    
     const {data}=await axios.get('http://localhost:3000/api/userdata')
      
  
    
    


    return(
        <Table className="border-2 w-[400px] border-blue-500 rounded-md">
            <TableHeader>
                <TableRow >
                    <TableHead className="text-black" >#</TableHead>
                    <TableHead className="text-black">Name</TableHead>
                    <TableHead className="text-black">Email</TableHead>
                    <TableHead className="text-black">Role</TableHead>
                    <TableHead className="text-black">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.allUser.map((item:any,index:number)=>(
                    <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.role}</TableCell>
                        <TableCell>
                          {item.role!==ROLE.ADMIN&& <RemoveUserBtn id={item._id}/>}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    )
}