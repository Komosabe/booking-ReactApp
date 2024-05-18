'use client'
import { useRouter } from 'next/navigation'

import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import { routes } from '../../../misc/routes'
import { TSignUpFormFields, signUp, signUpSchema } from '../../../api-booking/public/auth/signUp'

import { Button, Paper, PasswordInput, TextInput } from '@mantine/core'
export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFormFields>({
    resolver: zodResolver(signUpSchema),
  })

  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success('User created')
      router.push(routes['sign-in'])
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={onSubmit}>
        <TextInput {...register('username')} label="Login" placeholder="Your login" required />
        <PasswordInput
          {...register('password')}
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <PasswordInput
          {...register('confirmPassword')}
          label="Repeat Password"
          placeholder="Repeat Password"
          required
          mt="md"
          error={errors.confirmPassword?.message}
        />
        <Button type="submit" fullWidth mt="xl" disabled={isPending} loading={isPending}>
          Sign in
        </Button>
      </form>
    </Paper>
  )
}
