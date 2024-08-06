import React, { Suspense } from "react";
import { prisma } from "@/libs/prisma";
import Await from "@/components/admin/ui/await";
import AboutClient from "./components/about-client";
import Loading from "../loading";

const AboutPage = async () => {
  const about = prisma.about.findMany();

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Await promise={about}>
          {(about) => <>{about && <AboutClient about={about} />}</>}
        </Await>
      </Suspense>
    </div>
  );
};

export default AboutPage;
