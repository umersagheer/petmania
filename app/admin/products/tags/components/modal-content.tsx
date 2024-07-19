import { Avatar, Chip } from "@nextui-org/react";
import { MailIcon } from "lucide-react";
import React from "react";

type ModalContentProps = {
  data: any;
};

export default function ModalContent({ data }: ModalContentProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Chip endContent={<MailIcon size={16} />} variant="dot">
        {data.email}
      </Chip>
    </div>
  );
}
