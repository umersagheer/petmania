import { Avatar, Chip } from "@nextui-org/react";
import { MailIcon, WeightIcon } from "lucide-react";
import React from "react";

type ModalContentProps = {
  data: any;
};

export default function ModalContent({ data }: ModalContentProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Chip
        endContent={<WeightIcon size={16} />}
        variant="flat"
        color="primary"
      >
        {data.value} {data.unit} {data.price}
      </Chip>
    </div>
  );
}
