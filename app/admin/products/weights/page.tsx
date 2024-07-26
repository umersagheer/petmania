import React, { Suspense } from "react";
import { prisma } from "@/libs/prisma";
import Await from "@/components/admin/ui/await";
import Loading from "../../loading";
import WeightsClient from "./components/weights-client";

const WeightsPage = async () => {
  const weights = prisma.weight.findMany({});

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Await promise={weights}>
          {(weights) => <>{weights && <WeightsClient weights={weights} />}</>}
        </Await>
      </Suspense>
    </div>
  );
};

export default WeightsPage;
