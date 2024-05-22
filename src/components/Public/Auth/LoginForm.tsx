'use client'
import { Button, Paper, PasswordInput, TextInput } from '@mantine/core'
import { FormProvider, useForm } from 'react-hook-form'
import { TSignInFormFields, signIn, signInSchema } from '../../../api-booking/public/auth/signIn'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { routes } from '../../../misc/routes'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useUserStore from '../../../misc/store/useUserStore'
import { InputText } from '../../common/inputs/InputText'
import { metadata } from '../../../app/layout'

export const LoginForm = () => {
  const { setUserAuth, user } = useUserStore()

  const methods = useForm<TSignInFormFields>({
    resolver: zodResolver(signInSchema),
  })

  const { handleSubmit } = methods

  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      methods.reset()
      toast.success('User logged in')
      router.push(routes['index'])
      setUserAuth(data)
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <InputText name="username" label="Login" placeholder="Your login" required />
          <InputText
            type="password"
            name="password"
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Button type="submit" fullWidth mt="xl" disabled={isPending} loading={isPending}>
            Sign in
          </Button>
        </form>
      </FormProvider>
    </Paper>
  )
}
