


import React from 'react'
import { Navbar } from './_components/Navbar'

 interface settingsProps{
    children:React.ReactNode
 }

const SettingLayout = ({children}:settingsProps) => {
  return (
    <div className='w-full h-screen bg-gradient-to-r flex flex-col gap-4 justify-center items-center to-blue-600 from-red-400'>
        <Navbar/>
        {children}
    </div>
  )
}

export default SettingLayout