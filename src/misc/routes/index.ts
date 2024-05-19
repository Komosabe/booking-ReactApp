export const routes = {
  //Public
  index: '/',

  'sign-in': '/sign-in',
  'sign-up': '/sign-up',

  //halls
  halls: '/user-panel/halls',
  hall: (id = ':hallId') => `/user-panel/halls/${id}`,

  //concerts
  concerts: 'user-panel/concerts',
  concert: (id = ':concertId') => `/user-panel/concerts/${id}`,

  //Reservations
  reservations: '/user-panel/reservations',
}
