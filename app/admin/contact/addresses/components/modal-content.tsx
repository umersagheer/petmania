import { Link } from "@nextui-org/react";
import React from "react";

type ModalContentProps = {
  data: any;
};

export default function ModalContent({ data }: ModalContentProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h3 className="font-semibold">{data.address}</h3>
      <Link href={data.addressLink} target="_blank" isExternal showAnchorIcon>
        <p className="line-clamp-1 max-w-56">{data.addressLink}</p>
      </Link>
    </div>
  );
}
