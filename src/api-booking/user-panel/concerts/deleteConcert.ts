import { api } from '../../../lib/axios/config'
import { API_URL } from '../../../misc/config/env'

export const deleteConcert = (concertId: number) =>
  api.delete(`${API_URL}/api/Concert/DeleteConcert/${concertId}`).then(({ data }) => data)
