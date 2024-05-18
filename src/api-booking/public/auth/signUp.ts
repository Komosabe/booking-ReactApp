import axios from 'axios'
import { z } from 'zod'
import { API_URL } from '../../../misc/config/env'
import { api } from '../../../lib/axios/config'

export const signUpSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type TSignUpFormFields = z.infer<typeof signUpSchema>

export const signUp = (data: TSignUpFormFields) =>
  api.post(`${API_URL}/Users/register`, data).then(({ data }) => data)
