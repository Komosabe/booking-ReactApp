import { useQuery } from '@tanstack/react-query'
import { api } from '../../../lib/axios/config'
import { API_URL } from '../../../misc/config/env'

export type THall = {
  hallName: string
  capacity: number
}

export const GET_HALL_BY_ID_QUERY_KEY = ['getHallById']

export const getHallById = (hallId: number) =>
  api.get<THall>(`${API_URL}/api/Hall/${hallId}`).then(({ data }) => data)

export const useGetHallById = (hallId: number) => {
  return useQuery({
    queryKey: GET_HALL_BY_ID_QUERY_KEY,
    queryFn: () => getHallById(hallId),
  })
}
