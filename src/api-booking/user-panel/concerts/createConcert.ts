import { z } from 'zod'
import { api } from '../../../lib/axios/config'
import { API_URL } from '../../../misc/config/env'

export const createConcertSchema = z.object({
  ConcertName: z.string(),
  ArtistName: z.string(),
  DateTime: z.date(),
  HallId: z.string(),
})

export type TCreateConcertFormFields = z.infer<typeof createConcertSchema>
export type TCreateConcertResponse = { message: string }

export const createConcert = (data: TCreateConcertFormFields) =>
  api
    .post<TCreateConcertResponse>(`${API_URL}/api/Concert/CreateConcert`, {
      ...data,
      DateTime: new Date(data.DateTime),
      HallId: Number(data.HallId),
    })
    .then(({ data }) => data)
