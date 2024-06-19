import { useQuery } from '@tanstack/react-query'
import { api } from '../../../lib/axios/config'
import { API_URL } from '../../../misc/config/env'

export type TReservation = {
  id: number
  concertId: number
}

export const GET_RESERVATIONS_QUERY_KEY = ['getReservations']

export const getReservations = () =>
  api
    .get<TReservation[]>(`${API_URL}/api/Reservation/GetReservationsForUser`)
    .then(({ data }) => data)

export const useGetReservations = () => {
  return useQuery({
    queryKey: GET_RESERVATIONS_QUERY_KEY,
    queryFn: getReservations,
  })
}
