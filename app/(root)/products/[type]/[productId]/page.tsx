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
    console.error("Error fetching product data:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
  return products.map((product) => ({
    productId: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params;

  try {
    const productPromise = prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        weights: true,
        tags: true,
      },
    });

    const productWithTagsPromise = prisma.product.findUnique({
      where: { id: productId },
      include: {
        tags: true,
      },
    });

    const [product, productWithTags] = await Promise.all([
      productPromise,
      productWithTagsPromise,
    ]);

    if (!product || !productWithTags) {
      return <NotFound />;
    }

    const tagIds = productWithTags.tags.map((tag) => tag.id);

    const relatedProducts = await prisma.product.findMany({
      where: {
        AND: [
          { id: { not: productId } },
          { tags: { some: { id: { in: tagIds } } } },
        ],
      },
      include: {
        images: true,
        weights: true,
      },
    });

    return <ProductClient data={product} relatedProducts={relatedProducts} />;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return <NotFound />;
  } finally {
    await prisma.$disconnect();
  }
}
