"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import 'lightbox.js-react/dist/index.css'
import 'react-slideshow-image/dist/styles.css'
import 'react-photo-view/dist/react-photo-view.css';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}