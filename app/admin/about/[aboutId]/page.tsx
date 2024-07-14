import React from "react";
import About from "./components/form";

type AddAboutProps = {
  params: {
    aboutId: string;
  };
};

const AddAbout = ({ params }: AddAboutProps) => {
  return <About />;
};

export default AddAbout;
