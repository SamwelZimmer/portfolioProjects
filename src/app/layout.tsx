import './globals.css'
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google';

import RecoilRootWrapper from './RecoilRootWrapper'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Samwel's Projects",
  description: "View Samwel Zimmmer's Projects",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <RecoilRootWrapper>{children}</RecoilRootWrapper>
      </body>
    </html>
  )
}
