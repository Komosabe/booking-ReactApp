import { z } from 'zod'
import { api } from '../../../lib/axios/config'
import { API_URL } from '../../../misc/config/env'

export const editHallSchema = z.object({
  hallName: z.string(),
  capacity: z.number(),
})

export type TEditHallFormFields = z.infer<typeof editHallSchema>
export type TEditHallResponse = { message: string }

export const editHall = (hallId: number) => (data: TEditHallFormFields) =>
  api
    .put<TEditHallResponse>(`${API_URL}/api/Hall/UpdateHall/${hallId}`, data)
    .then(({ data }) => data)
