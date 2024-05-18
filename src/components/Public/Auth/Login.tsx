'use client'
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core'
import Link from 'next/link'
import { routes } from '../../../misc/routes'

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

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Login" placeholder="Your login" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />

        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  )
}
