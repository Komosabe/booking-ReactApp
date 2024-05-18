'use client'

import { redirect } from 'next/dist/server/api-utils'
import useUserStore from '../../misc/store/useUserStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type TPublicLayoutProps = {
  children: React.ReactNode
}
const PublicLayout = ({ children }: TPublicLayoutProps) => {
  const { user } = useUserStore()

  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/user-panel')
    }
  }, [user])

  if (user) return null
  return children
}

export default PublicLayout
