"use client";

import { Heading } from "@/components/admin/ui/heading";
import PlusIcon from "@/components/icons/plus";
import { brand } from "@/config/constants";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import { About } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

type AboutClientProps = {
  about: About;
};

const AboutClient = () => {
  const router = useRouter();
  // const action =
  return (
    <div className="my-12">
      <div className="flex justify-between items-center">
        <Heading title="About" description={`Manage ${brand.name} About`} />
        {}
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon width={16} height={16} />}
          onClick={() => {
            router.push("/admin/about/add");
          }}
        >
          Add
        </Button>
      </div>
      <div className="w-full flex justify-center items-center">
        <Card className="basis-1/3">
          <CardHeader className="font-bold text-medium tracking-wide">
            <Skeleton className="rounded-lg">About</Skeleton>
          </CardHeader>
          <CardBody>
            {/* <Skeleton isLoaded={!!about.aboutDescription}>
            {about.aboutDescription}
            </Skeleton> */}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AboutClient;
