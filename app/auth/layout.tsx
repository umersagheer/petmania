import "../globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";

import NextUiProvider from "@/providers/nextui-provider";
import AuthProvider from "@/providers/auth-provider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pet Mania",
  description:
    "Pet Mania offers a wide variety of cats and dogs food products.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
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
