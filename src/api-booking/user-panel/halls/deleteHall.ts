import { api } from '../../../lib/axios/config'
import { API_URL } from '../../../misc/config/env'

export const deleteHall = (hallId: number) =>
  api.delete(`${API_URL}/api/Hall/DeleteHall/${hallId}`).then(({ data }) => data)
