import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../../../misc/config/env'
import { api } from '../../../lib/axios/config'
import axios from 'axios'

const GET_ME_QYERY_KEY = ['me'] as const

export type TMeResponse = {
  id: number
  username: string
}

export const getMe = () => api.get<TMeResponse>(`${API_URL}/Users/me`).then(({ data }) => data)

export const useGetMe = () =>
  useQuery({
    queryKey: GET_ME_QYERY_KEY,
    queryFn: getMe,
  })
