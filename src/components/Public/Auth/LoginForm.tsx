'use client'
import { Button, Paper, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "react-hook-form"
import { TSignInFormFields, signIn, signInSchema } from "../../../api-booking/public/auth/signIn"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { routes } from "../../../misc/routes"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const LoginForm = () => {
    const {
        register,
        handleSubmit,
    } = useForm<TSignInFormFields>({
        resolver: zodResolver(signInSchema),
    })

    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: signIn,
        onSuccess: () => {
            toast.success('User logged in')
            router.push(routes['index'])
        },
    })

    const onSubmit = handleSubmit((data) => {
        mutate(data)
    })

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onSubmit}>
        <TextInput {...register('username')} label="Login" placeholder="Your login" required />
        <PasswordInput {...register('password')} label="Password" placeholder="Your password" required mt="md" />
        <Button type="submit" fullWidth mt="xl" disabled={isPending} loading={isPending}> 
          Sign in
        </Button>
      </form>
      </Paper>
  )
}

