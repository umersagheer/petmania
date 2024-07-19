import React, { Suspense } from "react";
import { prisma } from "@/libs/prisma";
import Await from "@/components/admin/ui/await";
import Loading from "../../loading";
import AddressesClient from "./components/addresses-client";

const AddressesPage = async () => {
  const addresses = prisma.address.findMany({});

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Await promise={addresses}>
          {(addresses) => (
            <>{addresses && <AddressesClient addresses={addresses} />}</>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default AddressesPage;
