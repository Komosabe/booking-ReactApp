import { Stack } from '@mantine/core'
import { ConcertTitleWithButtonAndFormModal } from './ConcertTitleWithButtonAndFormModal'
import { ConcertsDatatable } from './ConcertsDatatable'

export const VConcerts = () => {
  return (
    <Stack>
      <ConcertTitleWithButtonAndFormModal />
      <ConcertsDatatable />
    </Stack>
  )
}
