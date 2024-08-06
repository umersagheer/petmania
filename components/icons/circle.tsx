import React from "react";
import { IconSvgProps } from "./types";
export const CircleIllustration = (props: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 1422 800"
    width="70em"
    height="70em"
    {...props}
  >
    <defs>
      <radialGradient id="cccircular-grad" r="50%" cx="50%" cy="50%">
        <stop
          offset="50%"
          stopColor="hsl(212, 100%, 47%)"
          stopOpacity="0.5"
        ></stop>
        <stop offset="100%" stopColor="#0046bc" stopOpacity="0.5"></stop>
      </radialGradient>
    </defs>
    <g fill="url(#cccircular-grad)">
      <circle r="656" cx="711" cy="800" opacity="0.05"></circle>
      <circle r="615" cx="711" cy="800" opacity="0.11"></circle>
      <circle r="574" cx="711" cy="800" opacity="0.18"></circle>
      <circle r="533" cx="711" cy="800" opacity="0.24"></circle>
      <circle r="492" cx="711" cy="800" opacity="0.30"></circle>
      <circle r="451" cx="711" cy="800" opacity="0.37"></circle>
      <circle r="410" cx="711" cy="800" opacity="0.43"></circle>
      <circle r="369" cx="711" cy="800" opacity="0.49"></circle>
      <circle r="328" cx="711" cy="800" opacity="0.56"></circle>
      <circle r="287" cx="711" cy="800" opacity="0.62"></circle>
      <circle r="246" cx="711" cy="800" opacity="0.68"></circle>
      <circle r="205" cx="711" cy="800" opacity="0.75"></circle>
      <circle r="164" cx="711" cy="800" opacity="0.81"></circle>
      <circle r="123" cx="711" cy="800" opacity="0.87"></circle>
      <circle r="82" cx="711" cy="800" opacity="0.94"></circle>
    </g>
  </svg>
);
