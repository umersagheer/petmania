import "../globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";

import NextUiProvider from "@/providers/nextui-provider";
import AuthProvider from "@/providers/auth-provider";
import MainNavbar from "@/components/root/navbar";
import Footer from "@/components/root/footer";

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
            <MainNavbar />
            <main className="px-4 md:px-8">{children}</main>
            <Footer />
            <Toaster position="bottom-right" richColors />
          </NextUiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
