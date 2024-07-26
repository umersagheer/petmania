import React, { Suspense } from "react";
import { prisma } from "@/libs/prisma";
import Await from "@/components/admin/ui/await";
import Loading from "../../loading";
import ProductsClient from "./components/products-client";

const ProductsPage = async () => {
  const products = prisma.product.findMany({
    include: {
      images: true,
      tags: true,
      deals: true,
      weights: true,
    },
  });

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Await promise={products}>
          {(products) => (
            <>{products && <ProductsClient products={products} />}</>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default ProductsPage;
