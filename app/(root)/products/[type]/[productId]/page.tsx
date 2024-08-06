import React from "react";
import ProductClient from "./components/client";
import { prisma } from "@/libs/prisma";
import NotFound from "@/app/(root)/[...slug]/page";

type ProductPageProps = {
  params: {
    productId: string;
  };
};

type generateStaticParamsProps = {
  productId: string;
};

export async function generateStaticParams(): Promise<
  generateStaticParamsProps[]
> {
  let products;
  try {
    products = await prisma.product.findMany();
  } catch (error) {
    console.error("Error fetching Blog page data:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
  return products.map((product) => ({
    productId: product.id,
  }));
}
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
      weights: true,
      tags: true,
    },
  });

  const productWithTags = await prisma.product.findUnique({
    where: { id: params.productId },
    include: {
      tags: true,
    },
  });

  if (!productWithTags) {
    throw new Error(`Product with ID ${params.productId} not found`);
  }

  const tagIds = productWithTags.tags.map((tag) => tag.id);

  const relatedProducts = await prisma.product.findMany({
    where: {
      AND: [
        { id: { not: params.productId } },
        { tags: { some: { id: { in: tagIds } } } },
      ],
    },
    include: {
      images: true,
      weights: true,
    },
  });

  if (!product) {
    return <NotFound />;
  }

  return <ProductClient data={product} relatedProducts={relatedProducts} />;
}
