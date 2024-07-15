import React from "react";
import AboutForm from "./components/form";
import { prisma } from "@/libs/prisma";
import NotFound from "@/app/admin/[...slug]/page";

type AddAboutProps = {
  params: {
    aboutId: string;
  };
};

const AddAbout = async ({ params }: AddAboutProps) => {
  const aboutId = params.aboutId;

  if (aboutId === "add") {
    const existingEntries = await prisma.about.findMany();
    if (existingEntries.length > 0) {
      return <NotFound />;
    }
    return <AboutForm initialData={null} />;
  } else if (aboutId === "1") {
    const about = await prisma.about.findUnique({
      where: { id: "1" },
    });
    if (!about) {
      return <NotFound />;
    }
    return <AboutForm initialData={about} />;
  } else {
    return <NotFound />;
  }
};

export default AddAbout;
