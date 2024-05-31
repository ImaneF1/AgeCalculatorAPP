import './globals.css'
import { Poppins } from 'next/font/google';
import ThemeProvider from '@/components/ModeProvider';

const poppins = Poppins({ subsets: ['latin'],
weight: ['400', '700', '800'],});

export const metadata = {
  title: 'Age Calculator',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider>
      
      <body className={poppins.className}>{children}</body>
      </ThemeProvider>
    </html>
  )
}
