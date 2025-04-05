import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GradeAI - AI-Powered Grading for Educators",
  description: "Revolutionize your grading process with AI-powered code analysis and comprehensive project evaluation.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className + "max-w-5xl mx-auto"}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

