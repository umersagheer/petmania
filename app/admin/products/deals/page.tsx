import React, { Suspense } from "react";
import { prisma } from "@/libs/prisma";
import Await from "@/components/admin/ui/await";
import Loading from "../../loading";
import DealsClient from "./components/deals-client";

const DealsPage = async () => {
  const deals = prisma.deal.findMany({});

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Await promise={deals}>
          {(deals) => <>{deals && <DealsClient deals={deals} />}</>}
        </Await>
      </Suspense>
    </div>
  );
};

export default DealsPage;
