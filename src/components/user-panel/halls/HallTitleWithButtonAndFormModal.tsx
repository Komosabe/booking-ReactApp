'use client'
import { useState } from 'react'
import { Button, Group, Modal, Title } from '@mantine/core'

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
  return (
    <Modal opened={opened} onClose={onClose} title="Nowe miejsce">
      {/* Modal content */}
    </Modal>
  )
}
