import React from "react";
import { prisma } from "@/libs/prisma";
import WeightForm from "./components/weight-form";

type Props = {
  params: {
    weightId: string;
  };
};

const WeightPage = async ({ params }: Props) => {
  const weights = await prisma.weight.findUnique({
    where: {
      id: params.weightId,
    },
  });
  return <WeightForm initialData={weights} />;
};

export default WeightPage;
