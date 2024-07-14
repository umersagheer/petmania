import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Loading from "./loading";
import AboutTabs from "./components/tabs";

export default async function AboutLayout({
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
      <div className="fixed top-14 py-4 z-40 bg-background/60 w-full -mx-4 md:-mx-8 px-4 md:px-8 backdrop-blur-md">
        <AboutTabs />
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
