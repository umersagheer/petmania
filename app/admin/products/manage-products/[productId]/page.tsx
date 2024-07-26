import React from "react";
import { prisma } from "@/libs/prisma";
import ProductForm from "./components/product-form";

type Props = {
  params: {
    productId: string;
  };
};

const ProductPage = async ({ params }: Props) => {
  const products = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
      tags: true,
      deals: true,
      weights: true,
    },
  });

  const tags = await prisma.tag.findMany({});
  const deals = await prisma.deal.findMany({});
  const weights = await prisma.weight.findMany({});

  return (
    <ProductForm
      initialData={products}
      tags={tags}
      deals={deals}
      weights={weights}
    />
  );
};

export default ProductPage;
