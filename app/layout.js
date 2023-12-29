import { Inter } from 'next/font/google'
import './globals.css'
import { UserDetails } from './context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jingle Quest',
  description: 'Jingle Quest Christmas 2k23',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserDetails>
          {children}
        </UserDetails>
      </body>
    </html>
  )
}
