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
  Table,
  Text,
} from '@mantine/core'
import { useGetHalls } from '../../../api-booking/user-panel/halls/getHalls'
import { TbTrash } from 'react-icons/tb'
import { useState } from 'react'

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
                  <DeleteButtonWithModal />
                </Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </Card>
  )
}

const DeleteButtonWithModal = () => {
  const [opened, setOpened] = useState(false)
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
          <Button color="red" fullWidth onClick={() => setOpened(false)}>
            Tak
          </Button>
        </Group>
      </Modal>
    </>
  )
}
