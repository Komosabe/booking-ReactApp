import { z } from 'zod'
import { api } from '../../../lib/axios/config'
import { API_URL } from '../../../misc/config/env'

export const createReservationSchema = z.object({
  concertId: z.number(),
})

export type TCreateReservationFormFields = z.infer<typeof createReservationSchema>
export type TCreateReservationResponse = { message: string }

export const createReservation = (data: TCreateReservationFormFields) =>
  api
    .post<TCreateReservationResponse>(`${API_URL}/api/Reservation/CreateReservation`, data)
    .then(({ data }) => data)
