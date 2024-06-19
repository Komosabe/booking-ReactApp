'use client'
import { Card, Center, Loader, Table, Group } from '@mantine/core'
import { useGetReservations } from '../../../api-booking/user-panel/reservations/getReservations'
import { TConcert, useGetConcerts } from '../../../api-booking/user-panel/concerts/getConcerts'
import { THall, useGetHalls } from '../../../api-booking/user-panel/halls/getHalls'
import DeleteReservationButtonWithModal from './DeleteReservationButtonWithModal' // Importuj nowy komponent

const DATATBLE_HEADERS = ['Concert Name', 'Artist Name', 'Date', 'Hall Name', '']

export const ReservationsDatatable = () => {
  const { data: dataReservations, isPending: isPendingReservations } = useGetReservations()
  const { data: dataConcerts, isPending: isPendingConcerts } = useGetConcerts()
  const { data: dataHalls, isPending: isPendingHalls } = useGetHalls()

  if (isPendingReservations || isPendingConcerts || isPendingHalls)
    return (
      <Center>
        <Loader />
      </Center>
    )

  const concertsMap = dataConcerts?.reduce((acc, concert) => {
    acc[concert.id] = concert
    return acc
  }, {} as Record<number, TConcert>)

  const hallsMap = dataHalls?.reduce((acc, hall) => {
    acc[hall.id] = hall
    return acc
  }, ({} as Record<number, THall>) || {})

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
          {dataReservations &&
            dataReservations.map((reservation) => {
              const concert = concertsMap ? concertsMap[reservation.concertId] : null
              const hall = concert && hallsMap ? hallsMap[concert.hallId] : null
              return (
                <Table.Tr key={reservation.id}>
                  <Table.Td>{concert ? concert.concertName : '-'}</Table.Td>
                  <Table.Td>{concert ? concert.artistName : '-'}</Table.Td>
                  <Table.Td>{concert ? concert.dateTime : '-'}</Table.Td>
                  <Table.Td>{hall ? hall.hallName : '-'}</Table.Td>
                  <Table.Td>
                    <Group justify="flex-end" wrap="nowrap">
                      <DeleteReservationButtonWithModal reservationId={reservation.id} />
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
