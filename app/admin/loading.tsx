import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[70vh] ">
      <Spinner />
    </div>
  );
};

export default Loading;
