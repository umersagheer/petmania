import React, { Suspense } from "react";
import { prisma } from "@/libs/prisma";
import Await from "@/components/admin/ui/await";
import Loading from "../../loading";
import NumbersClient from "./components/numbers-client";

const NumbersPage = async () => {
  const numbers = prisma.number.findMany({});

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Await promise={numbers}>
          {(numbers) => <>{numbers && <NumbersClient numbers={numbers} />}</>}
        </Await>
      </Suspense>
    </div>
  );
};

export default NumbersPage;
