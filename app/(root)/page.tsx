import Image from "next/image";
import React from "react";

const RootPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Image
        src={"/illustrations/delivery_truck.svg"}
        width={50}
        height={50}
        alt="delivery-truck"
        className="object-contain size-72"
      />
      <h1 className="text-4xl font-bold">Savers Mart</h1>
      <p className="text-large">A b2b platform for buying products.</p>
      <span className="inline-flex h-full animate-background-shine cursor-pointer items-center justify-center rounded-full border border-primary bg-[linear-gradient(110deg,#000,45%,#7828c8,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-medium font-medium text-gray-300 -mt-1">
        Coming soon...
      </span>
    </div>
  );
};

export default RootPage;
