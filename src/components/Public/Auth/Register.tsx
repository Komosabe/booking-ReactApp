import { Anchor, Container, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { routes } from '../../../misc/routes'
import { RegisterForm } from './RegisterForm'

export const Register = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center">Create your account!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do you have an account yet?{' '}
        <Anchor size="sm" component="button">
          <Link href={routes['sign-in']}>Login</Link>
        </Anchor>
      </Text>
      <RegisterForm />
    </Container>
  )
}
