import React from "react";
import { prisma } from "@/libs/prisma";
import EmailForm from "./components/email-form";

type Props = {
  params: {
    emailId: string;
  };
};

const EmailPage = async ({ params }: Props) => {
  const emails = await prisma.email.findUnique({
    where: {
      id: params.emailId,
    },
  });
  return <EmailForm initialData={emails} />;
};

export default EmailPage;
