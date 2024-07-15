import "../globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";

import NextUiProvider from "@/providers/nextui-provider";
import AuthProvider from "@/providers/auth-provider";
import AdminNavbar from "@/components/admin/layout/navbar";
import { BackgroundIllustration } from "@/components/icons/bg";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pet Mania",
  description:
    "Pet Mania offers a wide variety of cats and dogs food products.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>
          <NextUiProvider>
            <AdminNavbar />
            <main className="px-4 md:px-8 my-4">
              <div className="fixed inset-0 overflow-hidden">
                <BackgroundIllustration size={100} />
              </div>
              {children}
            </main>
            <Toaster position="top-right" richColors closeButton />
          </NextUiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
