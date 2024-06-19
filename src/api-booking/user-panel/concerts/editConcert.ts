import { z } from 'zod'
import { API_URL } from '../../../misc/config/env'
import { api } from '../../../lib/axios/config'

export const editConcertSchema = z.object({
  concertName: z.string(),
  artistName: z.string(),
  dateTime: z.date(),
  hallId: z.number(),
})

export type TEditConcertFormFields = z.infer<typeof editConcertSchema>
export type TEditConcertResponse = { message: string }

export const editConcert = (concertId: number) => (data: TEditConcertFormFields) =>
  api
    .put<TEditConcertResponse>(`${API_URL}/api/Concert/UpdateConcert/${concertId}`, {
      ...data,
      dateTime: new Date(data.dateTime),
      hallId: Number(data.hallId),
    })
    .then(({ data }) => data)
