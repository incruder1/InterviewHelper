import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/ThemeProvider.tsx"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Interview helper",
  description: "Interview helper is a tool to help you prepare for your next interview",
};

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider >
      <html lang="en">
        <body className={inter.className}>
        <Toaster position="bottom-center" />
          <ThemeProvider
            attribute="class"
            defaultTheme="white"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
