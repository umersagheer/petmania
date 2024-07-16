import { Avatar, Chip } from "@nextui-org/react";
import React from "react";

type ModalContentProps = {
  data: any;
};

export default function ModalContent({ data }: ModalContentProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <p>{data.number}</p>
      <Chip
        color={data.isWhatsapp === true ? "success" : "default"}
        variant="dot"
      >
        {data.isWhatsapp === true ? "Using " : "Not using "}as whatsapp
      </Chip>
    </div>
  );
}
