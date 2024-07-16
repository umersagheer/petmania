import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Loading from "../loading";
import ContactTabs from "./components/tabs";

export default async function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth");
  }
  return (
    <>
      <div className="fixed hide-scrollbar overflow-x-scroll top-14 py-4 z-20 bg-background/60 w-full -mx-4 md:-mx-8 px-4 md:px-8 backdrop-blur-lg ">
        <ContactTabs />
      </div>
      <Suspense fallback={<Loading />}>
        <div className="mt-12">{children}</div>
      </Suspense>
    </>
  );
}
