import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Donation Roulette',
  description: 'Spin the wheel and donate crypto to charity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto max-w-6xl">
          {children}
          <footer className="mt-16 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Donation Roulette. All rights reserved.</p>
            <p className="mt-1">Donating crypto to charities made fun!</p>
          </footer>
        </main>
      </body>
    </html>
  )
} 