import { useQuery } from '@tanstack/react-query'
import { api } from '../../../lib/axios/config'
import { API_URL } from '../../../misc/config/env'

export type TConcert = {
  id: number
  concertName: string
  artistName: string
  dateTime: string
  hallId: number
}

export const GET_CONCERTS_QUERY_KEY = ['getConcerts']

export const getConcerts = () =>
  api.get<TConcert[]>(`${API_URL}/api/Concert/GetAllConcerts`).then(({ data }) => data)

export const useGetConcerts = () => {
  return useQuery({
    queryKey: GET_CONCERTS_QUERY_KEY,
    queryFn: getConcerts,
  })
}
