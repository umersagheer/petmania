import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import EmblaDealCarousel from "./emble-deal-carousel";
import { Deal, Tag, Weight } from "@prisma/client";

type Image = {
  id: string;
  url: string;
  productId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type Product = {
  id: string;
  title: string;
  type: number;
  description: string;
  ingredients: string;
  calorieContent: string;
  guaranteedAnalysis: string;
  benefits: string;
  bannerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  images: Image[];
};
type DealSectionProps = {
  deals: {
    Product: (Product & {
      images: Image[];
      tags: Tag[];
      deals: Deal[];
      weights: Weight[];
    })[];
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export default function DealSection({ deals }: DealSectionProps) {
  const OPTIONS: EmblaOptionsType = { align: "start" };
  return (
    <div className="flex flex-col items-start justify-center w-full my-4 md:my-8 shrink-0">
      {deals.map((deal) => (
        <div
          key={deal.id}
          className="flex flex-col items-start justify-center w-full gap-4 shrink-0"
        >
          <h3 className="mt-4 text-xl font-bold md:text-3xl md:mt-8">
            {deal.name}
          </h3>
          <EmblaDealCarousel slides={deal.Product} />
        </div>
      ))}
    </div>
  );
}
