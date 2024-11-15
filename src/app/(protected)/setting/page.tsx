
import { auth } from '@/auth'
import { LogOutBtn } from '@/components/auth/LogOutBtn'
import { Button } from '@/components/ui/button'
import React from 'react'
import { SettingsForms } from '../_components/SettingsForms'

const SettingsPage =async () => {
    const session=await auth()
  return (
   <SettingsForms/>
  )
}

export default SettingsPage