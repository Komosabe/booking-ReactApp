'use client'
import { Anchor, Title, Text, Container } from '@mantine/core'
import Link from 'next/link'
import { routes } from '../../../misc/routes'
import { LoginForm } from './LoginForm'

export const Login = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          <Link href={routes['sign-up']}>Create account</Link>
        </Anchor>
      </Text>
      <LoginForm />
    </Container>
  )
}
