'use client'
import { useState } from 'react'
import { Button, Card, Group, Modal, NumberInput, Stack, TextInput, Title } from '@mantine/core'
import { FormProvider, useForm } from 'react-hook-form'
import {
  TCreateHallFormFields,
  createHall,
  createHallSchema,
} from '../../../api-booking/user-panel/halls/createHall'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InputNumber } from '../../common/inputs/InputNumber'
import { InputText } from '../../common/inputs/InputText'
import { GET_HALLS_QUERY_KEY } from '../../../api-booking/user-panel/halls/getHalls'

export const HallTitleWithButtonAndFormModal = () => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <>
      <Card>
        <Group justify="space-between">
          <Title order={1}>Lista miejsc</Title>
          <Button onClick={() => setModalOpened(true)}>Dodaj</Button>
        </Group>
      </Card>
      <AddHallFormModal opened={modalOpened} onClose={() => setModalOpened(false)} />
    </>
  )
}

type TAddHallFormModalProps = {
  opened: boolean
  onClose: () => void
}

const AddHallFormModal = ({ onClose, opened }: TAddHallFormModalProps) => {
  const methods = useForm<TCreateHallFormFields>({
    resolver: zodResolver(createHallSchema),
  })
  const { register, handleSubmit, formState } = methods

  const clientQuerry = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: createHall,
    onSuccess: () => {
      methods.reset()
      toast.success('Hall created')
      onClose()
      clientQuerry.invalidateQueries({
        queryKey: GET_HALLS_QUERY_KEY,
      })
    },
  })

  const onsubmit = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <Modal opened={opened} onClose={onClose} title="Nowe miejsce">
      <FormProvider {...methods}>
        <form onSubmit={onsubmit}>
          <Stack gap={'xs'}>
            <InputText name="hallName" placeholder="Nazwa miejsca" />
            <InputNumber name="capacity" min={0} placeholder="Liczba miejsc" />
            <Group w={'100%'} wrap={'nowrap'} gap={'xs'}>
              <Button fullWidth color="blue" variant="outline" onClick={onClose}>
                Anuluj
              </Button>
              <Button fullWidth color="blue" type="submit" disabled={isPending} loading={isPending}>
                Dodaj
              </Button>
            </Group>
          </Stack>
        </form>
      </FormProvider>
    </Modal>
  )
}
