'use client'

import {
  ActionIcon,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Loader,
  Modal,
  Stack,
  Table,
  Text,
} from '@mantine/core'
import {
  GET_CONCERTS_QUERY_KEY,
  useGetConcerts,
} from '../../../api-booking/user-panel/concerts/getConcerts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteConcert } from '../../../api-booking/user-panel/concerts/deleteConcert'
import { TbPencil, TbPlus, TbTrash } from 'react-icons/tb'
import dayjs from 'dayjs'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TEditConcertFormFields,
  editConcert,
  editConcertSchema,
} from '../../../api-booking/user-panel/concerts/editConcert'
import toast from 'react-hot-toast'
import { InputText } from '../../common/inputs/InputText'
import { InputDateTimePicker } from '../../common/inputs/InputDateTimePicker'
import { InputSelect } from '../../common/inputs/InputSelect'
import {
  TCreateReservationFormFields,
  createReservation,
  createReservationSchema,
} from '../../../api-booking/user-panel/reservations/createReservation'
import { THall, useGetHalls } from '../../../api-booking/user-panel/halls/getHalls'

const DATATABLE_HEADERS = [
  'Nazwa Koncertu',
  'Artysta',
  'Data',
  'Miejsce',
  'Liczba Miejsc',
  'Liczba Rezerwacji',
  '',
]

export const ConcertsDatatable = () => {
  const { data: dataConcerts, isLoading: isLoadingConcerts, isError, error } = useGetConcerts()
  const { data: dataHalls, isPending: isPendingHalls } = useGetHalls()

  if (isLoadingConcerts || isPendingHalls) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  if (isError) {
    return (
      <Center>
        <div>Error: {error.message}</div>
      </Center>
    )
  }

  const hallsMap = dataHalls?.reduce((acc, hall) => {
    acc[hall.id] = hall
    return acc
  }, {} as Record<number, THall>)

  return (
    <Card>
      <Table>
        <Table.Thead>
          <Table.Tr>
            {DATATABLE_HEADERS.map((header) => (
              <Table.Th key={header}>{header}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {dataConcerts &&
            dataConcerts.map((concert) => {
              const hall = hallsMap ? hallsMap[concert.hallId] : null
              return (
                <Table.Tr key={concert.id}>
                  <Table.Td>{concert.concertName ?? '-'}</Table.Td>
                  <Table.Td>{concert.artistName ?? '-'}</Table.Td>
                  <Table.Td>{dayjs(concert.dateTime).format('DD-MM-YYYY HH:mm') ?? '-'}</Table.Td>
                  <Table.Td>{hall ? hall.hallName : '-'}</Table.Td>
                  <Table.Td>{concert.maxReservations ?? '-'}</Table.Td>
                  <Table.Td>{concert.currentReservations ?? '-'}</Table.Td>
                  <Table.Td>
                    <Group justify="flex-end" wrap="nowrap">
                      <CreateReservationButtonWithModal
                        concertId={concert.id}
                        maxReservations={concert.maxReservations}
                        currentReservations={concert.currentReservations}
                      />
                      {concert.isEditable ? <DeleteButtonWithModal concertId={concert.id} /> : null}
                      {concert.isEditable ? (
                        <EditButtonWithModal
                          concertId={concert.id}
                          concertName={concert.concertName}
                          artistName={concert.artistName}
                          dateTime={concert.dateTime}
                          hallId={concert.hallId}
                        />
                      ) : null}
                    </Group>
                  </Table.Td>
                </Table.Tr>
              )
            })}
        </Table.Tbody>
      </Table>
    </Card>
  )
}

const DeleteButtonWithModal = ({ concertId }: { concertId: number }) => {
  const [opened, setOpened] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteConcert,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_CONCERTS_QUERY_KEY,
      })
    },
  })

  const handleDelete = () => {
    mutation.mutate(concertId)
    setOpened(false)
  }

  return (
    <>
      <Group justify="flex-end">
        <ActionIcon onClick={() => setOpened(true)} color="red" variant="outline">
          <TbTrash />
        </ActionIcon>
      </Group>
      <Modal withCloseButton={false} opened={opened} onClose={() => setOpened(false)}>
        <Text>Czy usunąć?</Text>
        <Text c="dimmed" size="sm">
          Uwaga! Operacja jest nieodwracalna
        </Text>
        <Divider my={'sm'} />
        <Group w={'100%'} align="right" wrap="nowrap">
          <Button variant="outline" fullWidth onClick={() => setOpened(false)}>
            Nie
          </Button>
          <Button color="red" fullWidth onClick={handleDelete}>
            Tak
          </Button>
        </Group>
      </Modal>
    </>
  )
}

const EditButtonWithModal = ({
  concertId,
  concertName,
  artistName,
  dateTime,
  hallId,
}: {
  concertId: number
  concertName: string
  artistName: string
  dateTime: string
  hallId: number
}) => {
  const [opened, setOpened] = useState(false)

  const convertToDate = (dateString: string): Date => {
    return new Date(dateString)
  }

  const methods = useForm<TEditConcertFormFields>({
    resolver: zodResolver(editConcertSchema),
    values: {
      concertName: concertName || '',
      artistName: artistName || '',
      dateTime: convertToDate(dateTime) || new Date(),
      hallId: hallId || 0,
    },
  })

  const { handleSubmit, setValue } = methods

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: editConcert(concertId),
    onSuccess: () => {
      methods.reset()
      toast.success('Concert updated')
      queryClient.invalidateQueries({
        queryKey: GET_CONCERTS_QUERY_KEY,
      })
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <>
      <Group justify="flex-end">
        <ActionIcon onClick={() => setOpened(true)} color="blue" variant="outline">
          <TbPencil />
        </ActionIcon>
      </Group>
      <Modal withCloseButton={false} opened={opened} onClose={() => setOpened(false)}>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Stack gap={'xs'}>
              <InputText name="concertName" placeholder="Nazwa koncertu" />
              <InputText name="artistName" placeholder="Artysta" />
              <InputDateTimePicker name="dateTime" placeholder="Data" />
              <InputSelect name="hallId" placeholder="Miejsce" />
              <Divider my={'sm'} />
              <Group w={'100%'} align="right" wrap="nowrap">
                <Button variant="outline" fullWidth onClick={() => setOpened(false)}>
                  Anuluj
                </Button>
                <Button color="blue" fullWidth type="submit" disabled={isPending}>
                  Zapisz
                </Button>
              </Group>
            </Stack>
          </form>
        </FormProvider>
      </Modal>
    </>
  )
}

const CreateReservationButtonWithModal = ({
  concertId,
  maxReservations,
  currentReservations,
}: {
  concertId: number
  maxReservations: number
  currentReservations: number
}) => {
  const [opened, setOpened] = useState(false)
  const queryClient = useQueryClient()

  const methods = useForm<TCreateReservationFormFields>({
    resolver: zodResolver(createReservationSchema),
    defaultValues: {
      concertId: concertId,
    },
  })

  const { handleSubmit, reset } = methods

  const mutation = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      reset()
      toast.success('Reservation created')
      queryClient.invalidateQueries({
        queryKey: GET_CONCERTS_QUERY_KEY,
      })
      setOpened(false)
    },
    onError: (error) => {
      toast.error('Failed to create reservation')
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  const isDisabled = currentReservations >= maxReservations

  return (
    <>
      <Group justify="flex-end">
        <ActionIcon
          onClick={() => setOpened(true)}
          color="green"
          variant="outline"
          disabled={isDisabled}
        >
          <TbPlus />
        </ActionIcon>
      </Group>
      <Modal withCloseButton={false} opened={opened} onClose={() => setOpened(false)}>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Stack gap={'xs'}>
              <Divider my={'sm'} />
              <Group w={'100%'} align="right" wrap="nowrap">
                <Button variant="outline" fullWidth onClick={() => setOpened(false)}>
                  Anuluj
                </Button>
                <Button color="green" fullWidth type="submit" disabled={isDisabled}>
                  Dodaj rezerwację
                </Button>
              </Group>
            </Stack>
          </form>
        </FormProvider>
      </Modal>
    </>
  )
}
