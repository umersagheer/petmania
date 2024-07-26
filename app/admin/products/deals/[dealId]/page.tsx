import React from "react";
import { prisma } from "@/libs/prisma";
import DealForm from "./components/deal-form";

type Props = {
  params: {
    dealId: string;
  };
};

const DealPage = async ({ params }: Props) => {
  const deals = await prisma.deal.findUnique({
    where: {
      id: params.dealId,
    },
  });
  return <DealForm initialData={deals} />;
};

export default DealPage;
