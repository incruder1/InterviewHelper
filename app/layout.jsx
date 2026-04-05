import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/store/provider";
import { SITE_METADATA } from "@/constants/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata = SITE_METADATA;

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-[#0d0e14] text-white`}>
          <StoreProvider>
            <Toaster position="top-center" richColors />
{children}
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
