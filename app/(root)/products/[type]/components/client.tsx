"use client";

import { Heading } from "@/components/admin/ui/heading";
import ViewModal from "@/components/admin/ui/view-modal";
import { EyeFilledIcon } from "@/components/icons/eye";
import ModalContent from "@/components/root/product-modal-content";
import { foodTypes } from "@/config/food-types";
import { formatCurrency } from "@/libs/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image as CardImage,
  Chip,
  Image as NextImage,
  Tooltip,
} from "@nextui-org/react";
import { Image, Product, Weight } from "@prisma/client";
import {
  BriefcaseMedicalIcon,
  CatIcon,
  DogIcon,
  WeightIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  data: (Product & {
    images: Image[];
    weights: Weight[];
  })[];
  type: number;
  params: {
    type: string;
  };
};

export default function ProductTypeClient({ data, type, params }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dog = type === parseInt(foodTypes.dog);
  const cat = type === parseInt(foodTypes.cat);
  const medicated = type === parseInt(foodTypes.medicated);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mb-4 md:mb-6">
      <div className="flex items-center justify-start gap-3">
        <Heading
          title={`${dog ? "Dog Food" : cat ? "Cat Food" : "Medicated Food"}`}
          description={""}
        />
        {dog ? (
          <DogIcon className="w-8 h-8" />
        ) : cat ? (
          <CatIcon className="w-8 h-8" />
        ) : (
          <BriefcaseMedicalIcon className="w-8 h-8" />
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
        {data?.map((product) => (
          <React.Fragment key={product.id}>
            {isModalOpen && (
              <ViewModal title={"Product"} onClose={handleCloseModal} isProduct>
                <ModalContent data={product} />
              </ViewModal>
            )}
            <Card
              isPressable
              onPress={() =>
                router.push(`/products/${params.type}/${product.id}`)
              }
              isBlurred
              className="border-none w-80 md:w-96 bg-background/50 dark:bg-default-100/50"
            >
              <CardBody className="">
                <CardImage
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={product.title}
                  className="w-full object-cover h-[250px] md:h-[300px]"
                  src={product.images[0]?.url || "/images/placeholder.jpg"}
                />
              </CardBody>
              <CardFooter className="flex flex-col items-center justify-center gap-2">
                <h3 className="text-lg font-bold max-w-80 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-sm text-default-500 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-around w-full">
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-medium">From</span>
                    <p className="flex items-center justify-center gap-2 text-lg font-bold">
                      {formatCurrency(product.weights[0]?.price)}
                      <span className="flex gap-1 text-xs font-semibold">
                        {product.weights[0]?.value} {product.weights[0]?.unit}
                        <WeightIcon size={16} />
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Tooltip content="View Details">
                      <Button
                        as={Chip}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal();
                        }}
                        size="sm"
                        color="primary"
                        variant="flat"
                        radius="full"
                      >
                        <EyeFilledIcon width={24} height={24} />
                      </Button>
                    </Tooltip>
                    <Chip
                      size="lg"
                      color={dog ? "warning" : cat ? "secondary" : "success"}
                      variant="flat"
                      radius="full"
                    >
                      {dog ? (
                        <DogIcon />
                      ) : cat ? (
                        <CatIcon />
                      ) : (
                        <BriefcaseMedicalIcon />
                      )}
                    </Chip>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
