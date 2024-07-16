import React from "react";
import { prisma } from "@/libs/prisma";
import NumberForm from "./components/number-form";

type Props = {
  params: {
    numberId: string;
  };
};

const NumberPage = async ({ params }: Props) => {
  const numbers = await prisma.number.findUnique({
    where: {
      id: params.numberId,
    },
  });
  return <NumberForm initialData={numbers} />;
};

export default NumberPage;
