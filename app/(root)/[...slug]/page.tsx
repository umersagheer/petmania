import { rootPaths } from "@/config/constants";
import { Image, Link } from "@nextui-org/react";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-[80dvh] flex w-full justify-center items-center flex-col gap-5">
      <p className="font-bold text-center text-large">
        The page you are looking for is not available
      </p>
      <Image
        src={"/illustrations/page_not_found.svg"}
        alt="No data"
        className="max-w-xs aspect-video"
      />
      <Link href={`${rootPaths.root}`} isBlock showAnchorIcon>
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
