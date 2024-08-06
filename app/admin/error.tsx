"use client";

import { adminPaths } from "@/config/constants";
import { Image, Link } from "@nextui-org/react";
import React from "react";

export default function ErrorPage() {
  return (
    <div className="h-[80vh] flex w-full justify-center items-center flex-col gap-5">
      <p className="text-large font-bold">
        There was an error processing your request
      </p>
      <Image
        src={"/illustrations/server_down.svg"}
        alt="No data"
        className="aspect-video max-w-md"
      />
      <Link href={`${adminPaths.dashboard}`} isBlock showAnchorIcon>
        Return Home
      </Link>
    </div>
  );
}
