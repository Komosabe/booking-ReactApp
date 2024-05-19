'use client'
import { useState } from 'react'
import { Button, Group, Modal, NumberInput, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { TCreateHallFormFields, createHall, createHallSchema } from '../../../api-booking/user-panel/halls/createHall'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

export const HallTitleWithButtonAndFormModal = () => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <>
      <Group justify="space-between">
        <Title order={1}>Lista miejsc</Title>
        <Button onClick={() => setModalOpened(true)}>Dodaj</Button>
      </Group>
      <AddHallFormModal opened={modalOpened} onClose={() => setModalOpened(false)} />
    </>
  )
}

type TAddHallFormModalProps = {
  opened: boolean
  onClose: () => void
}


const AddHallFormModal = ({ onClose, opened }: TAddHallFormModalProps) => {

  const { register, handleSubmit } = useForm<TCreateHallFormFields>({
    resolver: zodResolver(createHallSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createHall,
    onSuccess: () => {
      toast.success('Hall created')
      onClose()
    },
  })

  const onsubmit = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <Modal opened={opened} onClose={onClose} title="Nowe miejsce">
      <form onSubmit={onsubmit}>
        <Stack gap={'xs'}>
          <TextInput {...register('name')} placeholder="Nazwa miejsca" />
          <NumberInput {...register('capacity')} min={0} placeholder="Liczba miejsc" />
          <Group w={"100%"} wrap={"nowrap"} gap={"xs"}>
            <Button fullWidth color="blue" variant="outline" onClick={onClose}>
              Anuluj
            </Button>
            <Button fullWidth color="blue" type='submit' disabled={isPending} loading={isPending}>Dodaj</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
