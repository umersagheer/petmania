import { prisma } from "./prisma";

export async function getRelatedProducts(productId: string) {
  const productWithTags = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      tags: true,
    },
  });

  if (!productWithTags) {
    throw new Error(`Product with ID ${productId} not found`);
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
      tags: true,
      images: true,
      weights: true,
    },
  });

  return relatedProducts;
}
