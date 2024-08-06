"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Banner, Product } from "@prisma/client";
import Image from "next/image";
import { Button } from "@nextui-org/react";

type EmblaCarouselProps = {
  slides: {
    id: string;
    image: string;
    product?: Product; // optional product field
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export function EmblaCarousel({ slides }: EmblaCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);

  return (
    <div className="-mx-4 overflow-hidden md:-mx-8" ref={emblaRef}>
      <div className="flex w-full aspect-[10/9] md:aspect-[28/9] ">
        {slides.slice(0, 6).map((slide) => (
          <div
            className="flex flex-col items-center justify-center basis-full shrink-0"
            key={slide.id}
          >
            <Image
              src={slide.image}
              alt={"Banner"}
              className="object-cover w-full h-full"
              width={1200}
              height={1200}
            />
            <div className="absolute z-0 flex flex-col items-center justify-center h-full min-w-full gap-3 p-3 font-mono text-xl text-slate-50 md:text-5xl bg-foreground/40 ">
              {slide.product && (
                <Button
                  color="primary"
                  variant="shadow"
                  radius="full"
                  className="z-50"
                >
                  Shop Now
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
