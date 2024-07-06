"use client";

import { Button } from "@nextui-org/react";
import React from "react";
import { toast } from "sonner";

const RootPage = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Pet Mania</h1>
      <p>This is the root page</p>
      <p>It&apos;s just a placeholder</p>
      <Button color="primary" onClick={() => toast.success("Hello World")}>
        Click me
      </Button>
    </div>
  );
};

export default RootPage;
