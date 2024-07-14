import { Card, CardBody } from "@nextui-org/react";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-[70vh] flex w-full justify-center items-center">
      <Card>
        <CardBody>The page you are looking for is not available</CardBody>
      </Card>
    </div>
  );
};

export default NotFound;
