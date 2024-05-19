'use client'

import { useRouter } from 'next/navigation'
import useUserStore from '../../misc/store/useUserStore'
import { routes } from '../../misc/routes'
import { useEffect } from 'react'
import { DoubleNavbar } from '../../layout/app-layout/_components/DoubleNavbar'
import { Box, Group } from '@mantine/core'

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
      wrap="nowrap"
      gap={0}
    >
      <DoubleNavbar />
      <Box
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '20px',
        }}
      >
        {children}
      </Box>
    </Group>
  )
}

export default UserPanelLayout
