import React from "react";
import { prisma } from "@/libs/prisma";
import TagForm from "./components/tag-form";

type Props = {
  params: {
    tagId: string;
  };
};

const TagPage = async ({ params }: Props) => {
  const tags = await prisma.tag.findUnique({
    where: {
      id: params.tagId,
    },
  });
  return <TagForm initialData={tags} />;
};

export default TagPage;
