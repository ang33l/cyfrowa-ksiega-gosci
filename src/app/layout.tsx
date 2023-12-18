import './globals.css'
import type { Metadata } from 'next'
import ConvexClientProvider from './(components)/ConvexClientProvider'
import { Suspense } from 'react'
import { UserAuthProvider, useUserAuth } from './(components)/UserAuthProvider'
import UserAuth from '@/components/userAuth'


export const metadata: Metadata = {
  title: 'Anna i Aleksander',
  description: 'Aplikacja - zamiennik księgi życzeń...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ConvexClientProvider>

      <html lang="en">
        <body>
          <UserAuthProvider>
            {children}

          </UserAuthProvider>
        </body>
      </html>
    </ConvexClientProvider>
  )
}
