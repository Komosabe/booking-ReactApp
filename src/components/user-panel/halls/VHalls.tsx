import { Button, Group, Stack, Title } from '@mantine/core'
import React from 'react'
import { HallTitleWithButtonAndFormModal } from './HallTitleWithButtonAndFormModal'
import { HallsDatatable } from './HallsDatatable'

export const VHalls = () => {
  return (
    <Stack>
      <HallTitleWithButtonAndFormModal />
      <HallsDatatable />
    </Stack>
  )
}
