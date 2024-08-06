import { adminPaths } from "@/config/constants";
import { Image, Link } from "@nextui-org/react";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-[80vh] flex w-full justify-center items-center flex-col gap-5">
      <p className="text-large font-bold">
        The page you are looking for is not available
      </p>
      <Image
        src={"/illustrations/page_not_found.svg"}
        alt="No data"
        className="aspect-video max-w-md"
      />
      <Link href={`${adminPaths.dashboard}`} isBlock showAnchorIcon>
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
