import React, { Suspense } from "react";
import AboutClient from "./components/client";
import { prisma } from "@/libs/prisma";
import Loading from "./loading";
import Await from "@/components/admin/ui/await";

const AboutPage = () => {
  const about = prisma.about.findUnique({
    where: { id: "1" },
  });

  return (
    <div>
      {/* <Suspense fallback={<Loading />}>
        <Await promise={about}>
          {(about) => <>{about && <AboutClient about={about} />}</>}
        </Await>
      </Suspense> */}
      <AboutClient />
    </div>
  );
};

export default AboutPage;
