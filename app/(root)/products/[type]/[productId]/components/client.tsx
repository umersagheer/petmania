"use client";

import { Heading } from "@/components/admin/ui/heading";
import { formatCurrency } from "@/libs/utils";
import RelatedProducts from "./related-products";

import {
  Card,
  CardBody,
  Chip,
  Image as NextImage,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Image, Product, Tag, Weight } from "@prisma/client";
import { TagIcon, WeightIcon } from "lucide-react";
import React from "react";

type ProductClientProps = {
  data: Product & {
    images: Image[];
    weights: Weight[];
    tags: Tag[];
  };
  relatedProducts: (Product & {
    images: Image[];
    weights: Weight[];
  })[];
};

export default function ProductClient({
  data,
  relatedProducts,
}: ProductClientProps) {
  return (
    <>
      <div className="flex mt-5 justify-around items-center flex-wrap">
        <div className="basis-1/2">
          <Tabs
            classNames={{
              tab: "max-w-fit px-0 h-24 ",
              tabContent: "group-data-[selected=true]:text-[#06b6d4]",
            }}
            aria-label="Options"
            variant="light"
            color="primary"
            placement="bottom"
          >
            {data.images.map((image, index) => (
              <Tab
                key={index}
                title={
                  <div className="flex items-center">
                    <NextImage
                      src={image.url}
                      alt={`Image ${index}`}
                      className="object-cover max-w-20 aspect-square"
                    />
                  </div>
                }
                className="flex items-center justify-center overflow-hidden"
              >
                <NextImage
                  src={image.url}
                  alt={`Image ${index}`}
                  className="object-contain max-w-sm aspect-square"
                />
              </Tab>
            ))}
          </Tabs>
        </div>
        {/* Product Details */}
        <div className="md:basis-1/2  flex flex-col gap-3 ">
          <Heading title={data.title} description={data.description} />

          {data.weights.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg">Available Weights</h3>
              <div className="flex flex-wrap items-center justify-start gap-2">
                {data.weights.map((weight) => (
                  <Chip
                    size="lg"
                    variant="flat"
                    color="primary"
                    key={weight.id}
                    startContent={<WeightIcon size={12} />}
                    className="[&>span]:!pr-0 !pr-0"
                  >
                    {weight.value} {weight.unit}{" "}
                    <Chip
                      color="primary"
                      variant="solid"
                      size="md"
                      className="!mr-0"
                    >
                      <span className="font-semibold">
                        {formatCurrency(weight.price)}
                      </span>
                    </Chip>
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {data.tags.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-md">Tags</h3>
              <div className="flex flex-wrap items-center justify-start gap-2">
                {data.tags.map((tag) => (
                  <Chip
                    size="md"
                    variant="flat"
                    color="primary"
                    key={tag.id}
                    startContent={<TagIcon size={12} />}
                  >
                    {tag.name}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="my-8 md:my-8 w-full">
        <Card
          isBlurred
          className="border-none bg-background/20 dark:bg-default-100/50"
        >
          <CardBody>
            <Tabs fullWidth color="primary">
              <Tab key="Benefits" title="Benefits">
                <p className="text-center text-base">{data.benefits}</p>
              </Tab>
              <Tab key="Ingredients" title="Ingredients">
                <p className="text-center text-base"> {data.ingredients}</p>
              </Tab>
              <Tab key="Guaranteed Analysis" title="Guaranteed Analysis">
                <p className="text-center text-base">
                  {data.guaranteedAnalysis}
                </p>
              </Tab>
              <Tab key="Colories" title="Colories">
                <p className="text-center text-base"> {data.calorieContent}</p>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>

      {/* Related Products */}
      <div className="my-8">
        <Heading title="Related Products" description="" />
        <RelatedProducts products={relatedProducts} />
      </div>
    </>
  );
}
