"use client";

import React, { useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Image, Product, Weight } from "@prisma/client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Tooltip,
  Image as CardImage,
} from "@nextui-org/react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseMedicalIcon,
  CatIcon,
  DogIcon,
  WeightIcon,
} from "lucide-react";
import { foodTypes } from "@/config/food-types";
import { formatCurrency } from "@/libs/utils";
import ViewModal from "../admin/ui/view-modal";
import { EyeFilledIcon } from "../icons/eye";
import { useRouter } from "next/navigation";
import ProductModalContent from "./product-modal-content";

type EmblaDealCarouselProps = {
  slides: (Product & {
    images: Image[];
    weights: Weight[];
  })[];
};

export default function EmblaDealCarousel({ slides }: EmblaDealCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="w-full md:py-12 md:px-8 embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide) => (
          <div className="embla__slide" key={slide.id}>
            {isModalOpen && (
              <ViewModal title={"Product"} onClose={handleCloseModal} isProduct>
                <ProductModalContent data={slide} />
              </ViewModal>
            )}
            <Card
              isPressable
              onPress={() => router.push(`/products/${slide.type}/${slide.id}`)}
              isBlurred
              className="border-none w-80 md:w-96 bg-background/50 dark:bg-default-100/50"
            >
              <CardBody className="">
                <CardImage
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={slide.title}
                  className="w-full object-cover h-[250px] md:h-[280px]"
                  src={slide.images[0]?.url || "/images/placeholder.jpg"}
                />
              </CardBody>
              <CardFooter className="flex flex-col items-center justify-center gap-2">
                <h3 className="text-lg font-bold max-w-80 line-clamp-1">
                  {slide.title}
                </h3>
                <p className="text-sm text-default-500 line-clamp-2">
                  {slide.description}
                </p>
                <div className="flex items-center justify-around w-full">
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-medium">From</span>
                    <p className="flex items-center justify-center gap-2 text-lg font-bold">
                      {formatCurrency(slide.weights[0]?.price)}
                      <span className="flex gap-1 text-xs font-semibold">
                        {slide.weights[0]?.value} {slide.weights[0]?.unit}
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
                        slide.type === parseInt(foodTypes.dog)
                          ? "warning"
                          : slide.type === parseInt(foodTypes.cat)
                          ? "secondary"
                          : "success"
                      }
                      variant="flat"
                      radius="full"
                    >
                      {slide.type === parseInt(foodTypes.dog) ? (
                        <DogIcon />
                      ) : slide.type === parseInt(foodTypes.cat) ? (
                        <CatIcon />
                      ) : (
                        <BriefcaseMedicalIcon />
                      )}
                    </Chip>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 mt-5">
        <Button
          color="primary"
          isIconOnly
          radius="full"
          className="embla__prev"
          onClick={scrollPrev}
        >
          <ArrowLeft />
        </Button>
        <Button
          color="primary"
          isIconOnly
          radius="full"
          className="embla__next"
          onClick={scrollNext}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
