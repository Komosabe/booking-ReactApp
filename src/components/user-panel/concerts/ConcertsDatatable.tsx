'use client'

import { Card, Center, Loader, Table } from '@mantine/core'
import { useGetConcerts } from '../../../api-booking/user-panel/concerts/getConcerts'

const DATATABLE_HEADERS = ['Nazwa Koncertu', 'Artysta', 'Data', 'Miejsce', '']

export const ConcertsDatatable = () => {
  const { data, isLoading, isError, error } = useGetConcerts()

  console.log(data) // Inspect the data structure

  if (isLoading) {
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
          {data &&
            data.map((concert) => (
              <Table.Tr key={concert.id}>
                <Table.Td>{concert.concertName ?? '-'}</Table.Td> {/* Updated property */}
                <Table.Td>{concert.artistName ?? '-'}</Table.Td> {/* Updated property */}
                <Table.Td>{concert.dateTime ?? '-'}</Table.Td> {/* Updated property */}
                <Table.Td>{concert.hallId ?? '-'}</Table.Td>
                <Table.Td>
                  {/* Uncomment and adapt if needed */}
                  {/* <Group justify="flex-end" wrap="nowrap">
                    <DeleteButtonWithModal hallId={hall.id} />
                    <EditButtonWithModal
                      hallId={hall.id}
                      hallName={hall.hallName}
                      capacity={hall.capacity}
                    />
                  </Group> */}
                </Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </Card>
  )
}
