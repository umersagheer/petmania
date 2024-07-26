import React, { Suspense } from "react";
import { prisma } from "@/libs/prisma";
import Await from "@/components/admin/ui/await";
import Loading from "../../loading";
import TagsClient from "./components/tags-client";

const TagsPage = async () => {
  const tags = prisma.tag.findMany({});

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Await promise={tags}>
          {(tags) => <>{tags && <TagsClient tags={tags} />}</>}
        </Await>
      </Suspense>
    </div>
  );
};

export default TagsPage;
