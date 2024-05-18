import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import Link from 'next/link'
import { routes } from '../../../misc/routes'

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

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Login" placeholder="Your login" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <PasswordInput label="Repeat Password" placeholder="Repeat Password" required mt="md" />
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  )
}
