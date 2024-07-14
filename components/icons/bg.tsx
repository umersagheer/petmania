import React from "react";
import { IconSvgProps } from "./types";
export const BackgroundIllustration = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    role="presentation"
    viewBox="0 0 800 800"
    width="50em"
    height="50em"
    {...props}
  >
    <defs>
      <filter
        id="bbblurry-filter"
        x="-100%"
        y="-100%"
        width="400%"
        height="400%"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur
          stdDeviation="105"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          in="SourceGraphic"
          edgeMode="none"
          result="blur"
        ></feGaussianBlur>
      </filter>
    </defs>
    <g filter="url(#bbblurry-filter)">
      <ellipse
        rx="80"
        ry="128.5"
        cx="186.56674700567697"
        cy="256.273258214503"
        fill="hsl(37, 99%, 67%)"
      ></ellipse>
      <ellipse
        rx="80"
        ry="128.5"
        cx="393.3323102092138"
        cy="356.8660983514192"
        fill="hsl(316, 73%, 52%)"
      ></ellipse>
      <ellipse
        rx="80"
        ry="128.5"
        cx="392.9421059726357"
        cy="638.9592552077235"
        fill="hsl(185, 100%, 57%)"
      ></ellipse>
      <ellipse
        rx="80"
        ry="128.5"
        cx="704.9038100321357"
        cy="499.60960084146416"
        fill="hsl(142, 100%, 89%)"
      ></ellipse>
    </g>
  </svg>
);
