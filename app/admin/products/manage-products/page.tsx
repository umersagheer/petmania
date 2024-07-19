import React, { Suspense } from "react";
import { prisma } from "@/libs/prisma";
import Await from "@/components/admin/ui/await";
import Loading from "../../loading";
import EmailsClient from "./components/emails-client";

const EmailsPage = async () => {
  const emails = prisma.email.findMany({});

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Await promise={emails}>
          {(emails) => <>{emails && <EmailsClient emails={emails} />}</>}
        </Await>
      </Suspense>
    </div>
  );
};

export default EmailsPage;
