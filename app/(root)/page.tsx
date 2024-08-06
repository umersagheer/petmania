import { prisma } from "@/libs/prisma";
import React, { Suspense } from "react";
import NotFound from "../admin/[...slug]/page";
import Loading from "../admin/loading";
import Await from "@/components/admin/ui/await";
import { EmblaCarousel } from "@/components/root/embla-hero-carousel";
import DealSection from "@/components/root/deal-section";

const RootPage = () => {
  let banners;
  let deals;
  try {
    banners = prisma.banner.findMany();
    deals = prisma.deal.findMany({
      include: {
        Product: {
          include: {
            images: true,
            weights: true,
            deals: true,
            tags: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching about page data:", error);
    return <NotFound />;
  }
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Suspense fallback={<Loading />}>
        <Await promise={banners}>
          {(banners) => <>{banners && <EmblaCarousel slides={banners} />}</>}
        </Await>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Await promise={deals}>
          {(deals) => <>{deals && <DealSection deals={deals} />}</>}
        </Await>
      </Suspense>
    </div>
  );
};

export default RootPage;
