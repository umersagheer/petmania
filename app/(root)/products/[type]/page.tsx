import { prisma } from "@/libs/prisma";
import React from "react";
import ProductTypeClient from "./components/client";
import NotFound from "../../[...slug]/page";
import { CircleIllustration } from "@/components/icons/circle";
import ErrorPage from "../../error";

type ProductTypePageProps = {
  params: {
    type: string;
  };
};

export default async function ProductTypePage({
  params,
}: ProductTypePageProps) {
  let type: number;
  if (params.type == "dog") {
    type = 1;
  } else if (params.type == "cat") {
    type = 2;
  } else if (params.type == "medicated") {
    type = 3;
  } else {
    return <NotFound />;
  }

  let products;
  try {
    products = await prisma.product.findMany({
      where: {
        type,
      },
      include: {
        images: true,
        weights: true,
      },
    });
  } catch (error) {
    console.log("Error fetching products:", error);
    return <ErrorPage />;
  }

  return (
    <div className="">
      <div className="fixed inset-0 overflow-hidden ">
        <CircleIllustration size={100} />
      </div>
      <ProductTypeClient data={products} type={type} params={params} />
    </div>
  );
}
