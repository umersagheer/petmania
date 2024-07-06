import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "../globals.css";

import NextUiProvider from "@/providers/nextui-provider";
import AuthProvider from "@/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pet Mania",
  description:
    "Pet Mania offers a wide variety of cats and dogs food products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NextUiProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </NextUiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
