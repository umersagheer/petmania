import { prisma } from "@/libs/prisma";
import React from "react";
import ContactClient from "./component/client";
import Error from "@/components/root/error";
import ErrorPage from "../error";

export default async function ContactPage() {
  let about;
  let numbers;
  let emails;
  let addresses;
  try {
    about = await prisma.about.findFirst();
    numbers = await prisma.number.findMany();
    emails = await prisma.email.findMany();
    addresses = await prisma.address.findMany();
  } catch (error) {
    return <ErrorPage />;
  }

  if (!about && !numbers && !emails) return <Error />;

  return (
    <div className="">
      <ContactClient
        data={about}
        emails={emails}
        numbers={numbers}
        addresses={addresses}
      />
    </div>
  );
}
