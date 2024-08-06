"use client";

import { Heading } from "@/components/admin/ui/heading";
import { EditIcon } from "@/components/icons/edit";
import PlusIcon from "@/components/icons/plus";
import { brand } from "@/config/constants";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { About } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

type AboutClientProps = {
  about: About[] | null;
};

const AboutClient = ({ about }: AboutClientProps) => {
  const router = useRouter();
  const aboutLength = about && about?.length >= 1;
  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading title="About" description={`Manage ${brand.name} About`} />
        <Button
          color="primary"
          variant="flat"
          startContent={
            aboutLength ? (
              <EditIcon width={16} height={16} />
            ) : (
              <PlusIcon width={16} height={16} />
            )
          }
          onClick={() => {
            if (aboutLength) {
              router.push("/admin/about/1");
            } else {
              router.push("/admin/about/add");
            }
          }}
        >
          {aboutLength ? "Edit" : "Add"}
        </Button>
      </div>

      <div className="w-full flex flex-wrap justify-center items-center gap-5">
        <Card className="lg:basis-1/3-minus-gap basis-full md:basis-1/2-minus-gap">
          <CardHeader className="font-semibold text-medium tracking-wide">
            <p>About</p>
          </CardHeader>
          <CardBody className="grid gap-2 place-items-center">
            <Image
              src={(about && about[0]?.aboutHeroImg) || ""}
              alt="About Hero Image"
              className="aspect-video object-cover"
            />

            <p className="line-clamp-4">
              {about && about[0]?.aboutDescription}
            </p>
          </CardBody>
        </Card>

        <Card className="lg:basis-1/3-minus-gap basis-full md:basis-1/2-minus-gap">
          <CardHeader className="font-semibold text-medium tracking-wide">
            <p>Vision</p>
          </CardHeader>
          <CardBody className="grid gap-2 place-items-center">
            <Image
              src={(about && about[0]?.aboutImg) || ""}
              alt="About image"
              className="aspect-video object-cover"
            />

            <p className="line-clamp-4">
              {about && about[0]?.visionDescription}
            </p>
          </CardBody>
        </Card>

        <Card className="lg:basis-1/3-minus-gap basis-full md:basis-1/2-minus-gap">
          <CardHeader className="font-semibold text-medium tracking-wide">
            <p>Goal</p>
          </CardHeader>
          <CardBody className="grid gap-2 place-items-center">
            <Image
              src={(about && about[0]?.descriptionImg) || ""}
              alt="Description image"
              className="aspect-video object-cover"
            />
            <p className="line-clamp-4">{about && about[0]?.goal}</p>
          </CardBody>
        </Card>

        <Card className="lg:basis-1/3-minus-gap basis-full md:basis-1/2-minus-gap">
          <CardHeader className="font-semibold text-medium tracking-wide">
            <p>Contact</p>
          </CardHeader>
          <CardBody className="grid gap-2 place-items-center">
            <Image
              src={(about && about[0]?.contactImg) || ""}
              alt="Description image"
              className="aspect-video object-cover"
            />
            <p className="line-clamp-4">
              {about && about[0]?.contactDescription}
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AboutClient;
