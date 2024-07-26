import { prisma } from "@/libs/prisma";
import React, { Suspense } from "react";
import Loading from "../../loading";
import Await from "@/components/admin/ui/await";
import BannersClient from "./components/banners-client";

export default function BannerPage() {
  const banners = prisma.banner.findMany({
    include: {
      product: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Await promise={banners}>
          {(banners) => <>{banners && <BannersClient banners={banners} />}</>}
        </Await>
      </Suspense>
    </div>
  );
}
