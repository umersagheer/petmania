"use client";

import { Heading } from "@/components/admin/ui/heading";
import Error from "@/components/root/error";
import { Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react";
import { About, Address, Email, Number } from "@prisma/client";
import {
  LucidePhoneCall,
  MailPlusIcon,
  MapPinnedIcon,
  PawPrintIcon,
} from "lucide-react";
import React from "react";
import ContactForm from "./contact-form";

type AboutClientProps = {
  data: About | null;
  numbers: Number[];
  emails: Email[];
  addresses: Address[];
};

export default function ContactClient({
  data,
  numbers,
  emails,
  addresses,
}: AboutClientProps) {
  if (!data && !numbers && !emails) return <Error />;
  return (
    <>
      {data && (
        <div>
          <div className="md:-mx-8 -mx-4">
            <Image src={data.contactImg} alt="about" />
          </div>
          <Heading title={"Contact PetMania"} description={""} />
          <div className="">
            <p>{data.contactDescription}</p>
          </div>
          <div className="flex flex-col md:flex-row my-10 justify-center items-center gap-5">
            <div className="basis-1/3 flex justify-center items-center flex-col gap-3 text-primary ">
              <MailPlusIcon size={44} />
              <h3 className="font-semibold text-xl">Email us</h3>
              {emails.map((email) => (
                <Link
                  color="foreground"
                  href={"mailto:" + email.email}
                  key={email.id}
                  showAnchorIcon
                  isBlock
                >
                  {email.email}
                </Link>
              ))}
            </div>
            <div className="basis-1/3 flex justify-center items-center flex-col gap-3 text-primary ">
              <LucidePhoneCall size={44} />
              <h3 className="font-semibold text-xl">Call us</h3>
              {numbers.map((number) => (
                <Link
                  color="foreground"
                  isBlock
                  showAnchorIcon
                  href={"tel:" + number.number}
                  key={number.id}
                >
                  {number.number}
                </Link>
              ))}
            </div>
            <div className="basis-1/3 flex justify-center items-center flex-col gap-3 text-primary ">
              <MapPinnedIcon size={44} />
              <h3 className="font-semibold text-xl">Find us at</h3>
              {addresses.map((address) => (
                <Link
                  key={address.id}
                  href={address.addressLink}
                  color="foreground"
                  isExternal
                  isBlock
                  showAnchorIcon
                >
                  <p className="line-clamp-1">{address.address}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row my-10 justify-center items-center gap-5">
        <div className=" basis-1/2 grid place-items-center">
          <Card className="my-10  w-72 md:w-96 p-4">
            <CardHeader className="justify-center items-center gap-3">
              <h2 className="text-2xl font-semibold">Contact</h2>
              <PawPrintIcon size={34} />
            </CardHeader>
            <CardBody>
              <ContactForm />
            </CardBody>
          </Card>
        </div>
        <div className="basis-1/2">
          <Image
            src="illustrations/contract.svg"
            alt="about"
            className="size-72"
          />
        </div>
      </div>
    </>
  );
}
