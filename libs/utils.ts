import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function extractPublicId(url: string) {
  const regex = /petMania-uploads\/\w+/gm;
  const match = url.match(regex);
  return match?.[0];
}

export function extractPublicIds(
  urls: {
    url: string;
  }[]
) {
  let singleString = "";
  urls.forEach((url) => {
    singleString += url.url;
  });

  const regex = /petMania-uploads\/\w+/gm;
  const match = singleString.match(regex);
  return match;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
