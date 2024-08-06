import React, { useState } from "react";
import { Image, Product, Weight } from "@prisma/client";
import { useRouter } from "next/navigation";
import { foodTypes } from "@/config/food-types";
import { EyeFilledIcon } from "@/components/icons/eye";
import { formatCurrency } from "@/libs/utils";
import {
  Card,
  CardBody,
  CardFooter,
  Tooltip,
  Button,
  Chip,
  Image as CardImage,
  ScrollShadow,
} from "@nextui-org/react";
import {
  WeightIcon,
  DogIcon,
  CatIcon,
  BriefcaseMedicalIcon,
} from "lucide-react";
import ViewModal from "@/components/admin/ui/view-modal";
import ProductModalContent from "@/components/root/product-modal-content";

type RelatedProductsProps = {
  products: (Product & {
    images: Image[];
    weights: Weight[];
  })[];
};

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="">
      <ScrollShadow
        className="flex gap-5 md:gap-8 overflow-scroll scrollbar-hide p-5"
        orientation="horizontal"
      >
        {products.map((product) => (
          <div className="basis-1/3" key={product.id}>
            {isModalOpen && (
              <ViewModal title={"Product"} onClose={handleCloseModal} isProduct>
                <ProductModalContent data={product} />
              </ViewModal>
            )}
            <Card
              isPressable
              onPress={() =>
                router.push(`/products/${product.type}/${product.id}`)
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
                      color={
                        product.type === parseInt(foodTypes.dog)
                          ? "warning"
                          : product.type === parseInt(foodTypes.cat)
                          ? "secondary"
                          : "success"
                      }
                      variant="flat"
                      radius="full"
                    >
                      {product.type === parseInt(foodTypes.dog) ? (
                        <DogIcon />
                      ) : product.type === parseInt(foodTypes.cat) ? (
                        <CatIcon />
                      ) : product.type === parseInt(foodTypes.medicated) ? (
                        <BriefcaseMedicalIcon />
                      ) : null}
                    </Chip>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </ScrollShadow>
    </div>
  );
}
