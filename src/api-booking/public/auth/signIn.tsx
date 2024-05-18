import axios from "axios"
import { z } from "zod"

export const signInSchema = z
    .object({
        username: z.string(),
        password: z.string(),
    })

export type TSignInFormFields = z.infer<typeof signInSchema>

export const signIn = (data: TSignInFormFields) =>
    axios.post("https://localhost:7227/Users/authenticate", data).then(({ data }) => data)