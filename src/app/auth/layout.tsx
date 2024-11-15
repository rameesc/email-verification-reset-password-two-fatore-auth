


import React from 'react'
interface layoutProps{
    children:React.ReactNode
}

const AuthLayout = ({children}:layoutProps) => {
  return (
    <div className='w-full h-screen bg-gradient-to-r flex justify-center items-center to-blue-600 from-red-400'>
        {children}
    </div>
  )
}

export default AuthLayout
