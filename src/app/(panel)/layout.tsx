'use client'

import { useRouter } from 'next/navigation'
import useUserStore from '../../misc/store/useUserStore'
import { routes } from '../../misc/routes'
import { useEffect } from 'react'
import { DoubleNavbar } from '../../layout/app-layout/_components/DoubleNavbar'
import { Group } from '@mantine/core'

type TUserPanelLayoutProps = {
  children: React.ReactNode
}

const UserPanelLayout = ({ children }: TUserPanelLayoutProps) => {
  const { user } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace(routes['index'])
    }
  }, [user])

  if (!user) return null

  return (
    <Group
      style={{
        height: '100vh',
      }}
      justify="flex-start"
      align="flex-start"
    >
      <DoubleNavbar /> {children}
    </Group>
  )
}

export default UserPanelLayout
