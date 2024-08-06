import { Chip } from "@nextui-org/react";
import { PackageCheckIcon, PackageMinusIcon } from "lucide-react";
import React from "react";

type ModalContentProps = {
  data: any;
};

export default function ModalContent({ data }: ModalContentProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p>{data.name}</p>
      {data.Product.length > 0 ? (
        data.Product.map((product: any) => (
          <div className="flex flex-wrap" key={product.id}>
            <Chip
              key={product.id}
              color="primary"
              variant="flat"
              startContent={<PackageCheckIcon size={16} />}
              size="sm"
            >
              {product.title}
            </Chip>
          </div>
        ))
      ) : (
        <p className="flex gap-2 text-xs text-center text-rose-500">
          <PackageMinusIcon size={16} />
          No Products attached to this deal
        </p>
      )}
    </div>
  );
}
