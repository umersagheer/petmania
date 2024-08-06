import { Heading } from "@/components/admin/ui/heading";
import { StickyScroll } from "@/components/root/sticky-scroll";
import { brand } from "@/config/constants";
import { Image } from "@nextui-org/react";
import { About } from "@prisma/client";
import React from "react";

type AboutClientProps = {
  data: About;
};

export default function AboutClient({ data }: AboutClientProps) {
  const content = [
    {
      title: "About",
      description: data.aboutDescription,
      content: (
        <Image
          src={data.aboutHeroImg}
          alt="about"
          className="h-full object-cover"
        />
      ),
    },
    {
      title: "Goal",
      description: data.goal,
      content: (
        <Image src={data.aboutImg} alt="goal" className="h-full object-cover" />
      ),
    },
    {
      title: "Vision",
      description: data.visionDescription,
      content: (
        <Image
          src={data.descriptionImg}
          alt="vision"
          className="h-full object-cover"
        />
      ),
    },
  ];

  return (
    <div>
      <div className="md:-mx-8 -mx-4">
        <Image src={data.aboutHeroImg} alt="about" />
      </div>
      <Heading title={`About ${brand.name}`} description={""} />
      <div>
        <StickyScroll content={content} />
      </div>
    </div>
  );
}
