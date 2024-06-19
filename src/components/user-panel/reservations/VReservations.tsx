import { Stack } from '@mantine/core'
import { ReservationTitle } from './ReservationTitle'
import { ReservationsDatatable } from './ReservationsDatatable'

export const VReservations = () => {
  return (
    <Stack>
      <ReservationTitle />
      <ReservationsDatatable />
    </Stack>
  )
}
