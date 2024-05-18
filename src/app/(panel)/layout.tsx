'use client'
import { useRouter } from 'next/navigation'
import useUserStore from '../../misc/store/useUserStore'
import { routes } from '../../misc/routes'
import { useEffect } from 'react'

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

  return children
}

export default UserPanelLayout
