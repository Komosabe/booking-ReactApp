'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Group, Modal, Stack, Title } from '@mantine/core'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  TCreateConcertFormFields,
  createConcert,
  createConcertSchema,
} from '../../../api-booking/user-panel/concerts/createConcert'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GET_CONCERTS_QUERY_KEY } from '../../../api-booking/user-panel/concerts/getConcerts'
import toast from 'react-hot-toast'
import { InputText } from '../../common/inputs/InputText'

export const ConcertTitleWithButtonAndFormModal = () => {
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <>
      <Card>
        <Group justify="space-between">
          <Title order={1}>Lista koncertów</Title>
          <Button onClick={() => setModalOpened(true)}>Dodaj</Button>
        </Group>
        <AddConcertFormModal opened={modalOpened} onClose={() => setModalOpened(false)} />
      </Card>
    </>
  )
}

type TAddConcertFormModalProps = {
  opened: boolean
  onClose: () => void
}

const AddConcertFormModal = ({ onClose, opened }: TAddConcertFormModalProps) => {
  const methods = useForm<TCreateConcertFormFields>({
    resolver: zodResolver(createConcertSchema),
  })
  const { handleSubmit } = methods

  const clientQuerry = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: createConcert,
    onSuccess: () => {
      methods.reset()
      toast.success('Concert created')
      onClose()
      clientQuerry.invalidateQueries({
        queryKey: GET_CONCERTS_QUERY_KEY,
      })
    },
  })

  const onsubmit = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <Modal opened={opened} onClose={onClose} title="Nowy koncert">
      <FormProvider {...methods}>
        <form onSubmit={onsubmit}>
          <Stack gap={'xs'}>
            <InputText name="ConcertName" placeholder="Nazwa koncertu" />
            <InputText name="ArtistName" placeholder="Nazwa artysty" />
            <InputText name="DateTime" placeholder="Data i godzina" />
            <InputText name="HallId" placeholder="Id sali" />
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
