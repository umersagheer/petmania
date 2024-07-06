import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";

import "../../globals.css";

import NextUiProvider from "@/providers/nextui-provider";
import AuthProvider from "@/providers/auth-provider";
import AdminNavbar from "@/components/admin/layout/navbar";
import AboutTabs from "./components/tabs";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Savers Mart",
  description: "A b2b platform for buying products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <NextUiProvider>
        <AboutTabs />
        {children}
        <Toaster position="bottom-right" richColors />
      </NextUiProvider>
    </AuthProvider>
  );
}
