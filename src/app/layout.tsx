'use client';
import './globals.css'

export const metadata = {
  title: 'Css to Unity uss converter',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"bg-base-100"}>{children}</body>
    </html>
  )
}
