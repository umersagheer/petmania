import { Avatar, Chip } from "@nextui-org/react";
import { PackageIcon, PackageMinusIcon } from "lucide-react";
import React from "react";

type ModalContentProps = {
  data: any;
};

export default function ModalContent({ data }: ModalContentProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Avatar src={data.image} className="w-32 h-32 text-large" radius="md" />
      <p>{data.title}</p>
      <h3 className="text-lg font-semibold">Product</h3>
      {data.product ? (
        <Chip
          variant="flat"
          color="primary"
          size="sm"
          startContent={<PackageIcon size={16} />}
        >
          {data.product.title}
        </Chip>
      ) : (
        <p className="text-sm flex gap-1 items-center text-rose-500 justify-center">
          <PackageMinusIcon size={16} /> No Product
        </p>
      )}
    </div>
  );
}
