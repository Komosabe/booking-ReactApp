import axios from 'axios'
import { z } from 'zod'

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
  axios.post('http://localhost:5038/Users/register', data).then(({ data }) => data)
