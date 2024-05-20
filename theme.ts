'use client'

import { Card, createTheme } from '@mantine/core'
import { themeToVars } from '@mantine/vanilla-extract'

export const theme = createTheme({
  defaultRadius: 'md',
  components: {
    Card: Card.extend({
      defaultProps: {
        shadow: 'xl',
      },
    }),
  },
})
export const vars = themeToVars(theme)
