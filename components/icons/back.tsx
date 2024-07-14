import React from "react";
import { IconSvgProps } from "./types";

const BackArrowIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      {...props}
      height={size || height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};

export default BackArrowIcon;
