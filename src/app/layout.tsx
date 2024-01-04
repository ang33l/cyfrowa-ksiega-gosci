import './globals.css'
import type { Metadata } from 'next'
import ConvexClientProvider from './(components)/ConvexClientProvider'
import { UserAuthProvider } from './(components)/UserAuthProvider'
import ClientLayout from './client_layout'


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
            <ClientLayout>
              {children}
            </ClientLayout>
          </UserAuthProvider>
        </body>
      </html>
    </ConvexClientProvider>
  )
}
