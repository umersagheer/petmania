import React from "react";
import { prisma } from "@/libs/prisma";
import BannerForm from "./components/banner-form";

type Props = {
  params: {
    bannerId: string;
  };
};

const BannerPage = async ({ params }: Props) => {
  const banners = await prisma.banner.findUnique({
    where: {
      id: params.bannerId,
    },
    include: {
      product: true,
    },
  });

  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return <BannerForm initialData={banners} products={products} />;
};

export default BannerPage;
