import Loading from "@/app/admin/loading";
import ProductsClient from "@/app/admin/products/manage-products/components/products-client";
import Await from "@/components/admin/ui/await";
import { prisma } from "@/libs/prisma";
import React, { Suspense } from "react";
import AboutClient from "./component/client";

export default function AboutPage() {
  const about = prisma.about.findFirst();
  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Await promise={about}>
          {(about) => <>{about && <AboutClient data={about} />}</>}
        </Await>
      </Suspense>
    </div>
  );
}
