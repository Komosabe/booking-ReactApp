import axios from 'axios'
import { z } from 'zod'
import { API_URL } from '../../../misc/config/env'
import { api } from '../../../lib/axios/config'

export const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export type TSignInFormFields = z.infer<typeof signInSchema>
export type TSignInResponse = {
  token: string
  id: number
  username: string
}
export const signIn = (data: TSignInFormFields) =>
  api.post<TSignInResponse>(`${API_URL}/Users/authenticate`, data).then(({ data }) => data)
