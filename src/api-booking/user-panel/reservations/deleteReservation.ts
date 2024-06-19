import { api } from '../../../lib/axios/config'
import { API_URL } from '../../../misc/config/env'

export const deleteReservation = (reservationId: number) =>
  api
    .delete(`${API_URL}/api/Reservation/DeleteReservation/${reservationId}`)
    .then(({ data }) => data)
