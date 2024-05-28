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
import { GET_HALLS_QUERY_KEY, useGetHalls } from '../../../api-booking/user-panel/halls/getHalls'
import { TbPencil, TbTrash } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteHall } from '../../../api-booking/user-panel/halls/deleteHall'
import { IconAdjustments } from '@tabler/icons-react'
import {
  TEditHallFormFields,
  editHall,
  editHallSchema,
} from '../../../api-booking/user-panel/halls/editHall'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { on } from 'events'
import toast from 'react-hot-toast'
import { InputNumber } from '../../common/inputs/InputNumber'
import { InputText } from '../../common/inputs/InputText'
import { useGetHallById } from '../../../api-booking/user-panel/halls/getHallById'

const DATATBLE_HEADERS = ['Nazwa', 'Pojemność', '']
export const HallsDatatable = () => {
  const { data, isPending } = useGetHalls()
  if (isPending)
    return (
      <Center>
        <Loader />
      </Center>
    )

  return (
    <Card>
      <Table>
        <Table.Thead>
          <Table.Tr>
            {DATATBLE_HEADERS.map((header) => (
              <Table.Th key={header}>{header}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data &&
            data.map((hall) => (
              <Table.Tr key={hall.id}>
                <Table.Td>{hall.hallName ?? '-'}</Table.Td>
                <Table.Td>{hall.capacity ?? '-'}</Table.Td>
                <Table.Td>
                  <Group justify="flex-end" wrap="nowrap">
                    <DeleteButtonWithModal hallId={hall.id} />
                    <EditButtonWithModal
                      hallId={hall.id}
                      hallName={hall.hallName}
                      capacity={hall.capacity}
                    />
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </Card>
  )
}

const DeleteButtonWithModal = ({ hallId }: { hallId: number }) => {
  const [opened, setOpened] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteHall,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_HALLS_QUERY_KEY,
      })
    },
  })

  const handleDelete = () => {
    mutation.mutate(hallId)
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
  hallId,
  hallName,
  capacity,
}: {
  hallId: number
  hallName: string
  capacity: number
}) => {
  const [opened, setOpened] = useState(false)

  const methods = useForm<TEditHallFormFields>({
    resolver: zodResolver(editHallSchema),
    values: {
      hallName: hallName || '',
      capacity: capacity || 0,
    },
  })

  const { handleSubmit, setValue } = methods

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: editHall(hallId),
    onSuccess: () => {
      methods.reset()
      toast.success('Hall updated')
      queryClient.invalidateQueries({
        queryKey: GET_HALLS_QUERY_KEY,
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
              <Text>Edycja</Text>
              <InputText name="hallName" placeholder="Nazwa miejsca" />
              <InputNumber name="capacity" min={0} placeholder="Liczba miejsc" />
              <Divider my={'sm'} />
              <Group w={'100%'} align="right" wrap="nowrap">
                <Button variant="outline" fullWidth onClick={() => setOpened(false)}>
                  Nie
                </Button>
                <Button
                  color="blue"
                  fullWidth
                  onClick={onSubmit}
                  disabled={isPending}
                  loading={isPending}
                >
                  Tak
                </Button>
              </Group>
            </Stack>
          </form>
        </FormProvider>
      </Modal>
    </>
  )
}
