import { foodTypes } from "@/config/food-types";
import { Chip, Image, Tab, Tabs } from "@nextui-org/react";
import {
  BriefcaseMedicalIcon,
  CatIcon,
  DogIcon,
  FlameIcon,
  TagIcon,
  WeightIcon,
} from "lucide-react";
import React from "react";

type ModalContentProps = {
  data: any;
};

export default function ModalContent({ data }: ModalContentProps) {
  const dog = data.type === parseInt(foodTypes.dog);
  const cat = data.type === parseInt(foodTypes.cat);
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="basis-1/3">
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
                    className="max-w-16 aspect-square object-contain"
                  />
                </div>
              }
              className="overflow-hidden flex justify-center items-center"
            >
              <Image
                src={image.url}
                alt={`Image ${index}`}
                className="min-w-40 aspect-square object-contain"
              />
            </Tab>
          ))}
        </Tabs>
      </div>

      <div className="flex flex-col gap-1 justify-center items-start basis-1/3">
        <h3 className="text-lg font-semibold flex items-center justify-center gap-1">
          {data.title}
          <Chip
            color={dog ? "warning" : cat ? "secondary" : "success"}
            size="sm"
            variant="flat"
          >
            {dog ? (
              <DogIcon size={16} />
            ) : cat ? (
              <CatIcon size={16} />
            ) : (
              <BriefcaseMedicalIcon size={16} />
            )}
          </Chip>
        </h3>

        <p className="text-xs line-clamp-4">{data.description}</p>
        {data.weights.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold">Weights</h3>
            <div className="flex gap-2 justify-start items-center flex-wrap">
              {data.weights.map((weight: any) => (
                <Chip
                  size="sm"
                  variant="flat"
                  color="primary"
                  key={weight.id}
                  endContent={<WeightIcon size={12} />}
                >
                  <p>
                    {weight.value} {weight.unit} {weight.price} PKR
                  </p>
                </Chip>
              ))}
            </div>
          </div>
        )}

        {data.tags.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold">Tags</h3>
            <div className="flex gap-2 justify-start items-center flex-wrap">
              {data.tags.map((tag: any) => (
                <Chip
                  size="sm"
                  variant="flat"
                  color="primary"
                  key={tag.id}
                  endContent={<TagIcon size={12} />}
                >
                  <p>{tag.name}</p>
                </Chip>
              ))}
            </div>
          </div>
        )}

        {data.deals.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold">Deals</h3>
            <div className="flex gap-2 justify-start items-center flex-wrap">
              {data.deals.map((deal: any) => (
                <Chip
                  size="sm"
                  variant="flat"
                  color="primary"
                  key={deal.id}
                  endContent={<FlameIcon size={12} />}
                >
                  <p>{deal.name}</p>
                </Chip>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* additional info */}
      <div className="basis-1/3">
        <h3 className="text-md font-semibold">Ingrdients</h3>
        <p className="text-xs line-clamp-6">{data.ingredients}</p>
        <h3 className="text-md font-semibold">Calories Content</h3>
        <p className="text-xs line-clamp-6">{data.calorieContent}</p>
        <h3 className="text-md font-semibold">Analysis</h3>
        <p className="text-xs line-clamp-6">{data.guaranteedAnalysis}</p>
      </div>
    </div>
  );
}
