import { z } from 'zod'
import { API_URL } from '../../../misc/config/env'
import { api } from '../../../lib/axios/config'

export const createHallSchema = z.object({
  hallName: z.string(),
  capacity: z.number(),
})

export type TCreateHallFormFields = z.infer<typeof createHallSchema>
export type TCreateHallResponse = { message: string }

export const createHall = (data: TCreateHallFormFields) =>
  api.post<TCreateHallResponse>(`${API_URL}/api/Hall/CreateHall`, data).then(({ data }) => data)
