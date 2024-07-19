import React from "react";
import { prisma } from "@/libs/prisma";
import AddressForm from "./components/address-form";

type Props = {
  params: {
    addressId: string;
  };
};

const AddressPage = async ({ params }: Props) => {
  const addresses = await prisma.address.findUnique({
    where: {
      id: params.addressId,
    },
  });
  return <AddressForm initialData={addresses} />;
};

export default AddressPage;
