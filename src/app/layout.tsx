import React from 'react'

import { theme } from '../../theme'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import '@mantine/core/styles.css'
import { ReactQueryProvider } from '../lib/react-query/provider'
import { Toaster } from 'react-hot-toast'
import { VerifyAuth } from '../components/common/Auth/VerifyAuth'

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
}
export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ReactQueryProvider>
          <MantineProvider theme={theme}>
            <VerifyAuth>{children}</VerifyAuth>
            {/* {children} */}
          </MantineProvider>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
