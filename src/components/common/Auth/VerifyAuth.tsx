'use client'
import React, { useEffect, useState } from 'react'
import { TMeResponse, getMe, useGetMe } from '../../../api-booking/public/auth/getMe'
import { api } from '../../../lib/axios/config'
import { API_URL } from '../../../misc/config/env'
import { Group, Loader } from '@mantine/core'
import useUserStore from '../../../misc/store/useUserStore'

type TVerifyAuthProps = {
  children: React.ReactNode
}
export const VerifyAuth = ({ children }: TVerifyAuthProps) => {
  const { clearUserAuth } = useUserStore()
  const [userQuery, setUserQuery] = useState({
    isLoading: true,
    data: null as TMeResponse | null,
  })

  useEffect(() => {
    getMe()
      .then(({ username, id }) => {
        setUserQuery({
          isLoading: false,
          data: { username, id: id },
        })
      })
      .catch((error) => {
        clearUserAuth()
        setUserQuery({
          isLoading: false,
          data: null,
        })
      })
  }, [])

  if (userQuery.isLoading)
    return (
      <Group justify="center">
        <Loader />
      </Group>
    )
  return children
}
