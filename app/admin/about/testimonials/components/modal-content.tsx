import { Avatar } from "@nextui-org/react";
import React from "react";

type ModalContentProps = {
  data: any;
};

export default function ModalContent({ data }: ModalContentProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Avatar src={data.image} className="w-32 h-32 text-large" radius="md" />
      <p>{data.name}</p>
      <p className="text-small">Rating: {data.rating}/5</p>
      <p className="text-small line-clamp-4">{data.description}</p>
    </div>
  );
}
