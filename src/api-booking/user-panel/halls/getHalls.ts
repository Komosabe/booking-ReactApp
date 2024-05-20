import { useQuery } from '@tanstack/react-query'
import { api } from '../../../lib/axios/config'
import { API_URL } from '../../../misc/config/env'

export type THall = {
  id: number
  hallName: string
  capacity: number
}

export const GET_HALLS_QUERY_KEY = ['getHalls']

export const getHalls = () =>
  api.get<THall[]>(`${API_URL}/api/Hall/GetAllHalls`).then(({ data }) => data)

export const useGetHalls = () => {
  return useQuery({
    queryKey: GET_HALLS_QUERY_KEY,
    queryFn: getHalls,
  })
}
