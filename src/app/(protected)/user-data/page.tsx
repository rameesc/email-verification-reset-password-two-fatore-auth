

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { UserTable } from '../_components/UserTable'
  
const UserData = () => {
  return (
    <div>
        <Card className='w-[500px] flex flex-col justify-center items-center'>
            <CardHeader>
                <CardTitle className='text-[30px]'>User Data</CardTitle>
            </CardHeader>
            <CardContent>
                <UserTable/>

            </CardContent>
            
        </Card>
    </div>
  )
}

export default UserData