import { foodTypes } from "@/config/food-types";
import { formatCurrency } from "@/libs/utils";
import { Chip, Image, Tab, Tabs } from "@nextui-org/react";
import {
  BriefcaseMedicalIcon,
  CatIcon,
  DogIcon,
  WeightIcon,
} from "lucide-react";
import React from "react";

type ModalContentProps = {
  data: any;
};

export default function ProductModalContent({ data }: ModalContentProps) {
  const dog = data.type === parseInt(foodTypes.dog);
  const cat = data.type === parseInt(foodTypes.cat);
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="basis-1/2">
        <Tabs
          aria-label="Options"
          variant="light"
          color="primary"
          placement="bottom"
        >
          {data.images.map((image: any, index: any) => (
            <Tab
              key={index}
              title={
                <div className="flex items-center">
                  <Image
                    src={image.url}
                    alt={`Image ${index}`}
                    className="object-cover max-w-16 aspect-square"
                  />
                </div>
              }
              className="flex items-center justify-center overflow-hidden"
            >
              <Image
                src={image.url}
                alt={`Image ${index}`}
                className="object-contain max-w-56 aspect-square"
              />
            </Tab>
          ))}
        </Tabs>
      </div>

      <div className="flex flex-col items-start justify-center gap-5 basis-1/2">
        <h3 className="flex items-center justify-center gap-2 text-2xl font-semibold">
          {data.title}
          <Chip
            color={dog ? "warning" : cat ? "secondary" : "success"}
            size="lg"
            variant="flat"
          >
            {dog ? (
              <DogIcon size={24} />
            ) : cat ? (
              <CatIcon size={24} />
            ) : (
              <BriefcaseMedicalIcon size={24} />
            )}
          </Chip>
        </h3>

        <p className="-mt-3 text-sm line-clamp-4">{data.description}</p>
        {data.weights.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-md">Available Weights</h3>
            <div className="flex flex-wrap items-center justify-start gap-2">
              {data.weights.map((weight: any) => (
                <Chip
                  size="md"
                  variant="flat"
                  color="primary"
                  key={weight.id}
                  startContent={<WeightIcon size={12} />}
                  className="[&>span]:!pr-0 !pr-0"
                >
                  <p>
                    {weight.value} {weight.unit}{" "}
                    <Chip
                      color="primary"
                      variant="solid"
                      size="sm"
                      className="!mr-0"
                    >
                      <span className="font-semibold">
                        {formatCurrency(weight.price)}
                      </span>
                    </Chip>
                  </p>
                </Chip>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
