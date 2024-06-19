import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Modal, Text, Divider, Group, ActionIcon } from '@mantine/core'
import { TbTrash } from 'react-icons/tb'
import { deleteReservation } from '../../../api-booking/user-panel/reservations/deleteReservation'
import { GET_RESERVATIONS_QUERY_KEY } from '../../../api-booking/user-panel/reservations/getReservations'
import toast from 'react-hot-toast'

const DeleteReservationButtonWithModal = ({ reservationId }: { reservationId: number }) => {
  const [opened, setOpened] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_RESERVATIONS_QUERY_KEY,
      })
      toast.success('Reservation deleted')
    },
    onError: () => {
      toast.error('Failed to delete reservation')
    },
  })

  const handleDelete = () => {
    mutation.mutate(reservationId)
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

export default DeleteReservationButtonWithModal
