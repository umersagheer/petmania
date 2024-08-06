import { Image, Link, Tooltip } from "@nextui-org/react";
import NextImage from "next/image";
import React, { Suspense } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircleHeart,
  Twitter,
  Youtube,
} from "lucide-react";
import { Address, Email, Number } from "@prisma/client";
import { prisma } from "@/libs/prisma";
import Error from "./error";
import Loading from "@/app/admin/loading";
import Await from "../admin/ui/await";
import { adminPaths, brand } from "@/config/constants";

export default async function Footer() {
  let numbers: Number[];
  let emails: Email[];
  let addresses: Address[];
  try {
    numbers = await prisma.number.findMany();
    emails = await prisma.email.findMany();
    addresses = await prisma.address.findMany();
  } catch (error) {
    console.log("Error fetching about page data:", error);
    return <Error />;
  } finally {
    prisma.$disconnect();
  }
  const links = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Dog",
      href: "/products/dog",
    },
    {
      title: "Cat",
      href: "/products/cat",
    },
    {
      title: "Medicated",
      href: "/products/medicated",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];
  const about = prisma.about.findFirst();
  return (
    <Suspense fallback={<Loading />}>
      <Await promise={about}>
        {(about) => (
          <>
            {about && (
              <div className=" mt-12 relative z-10 bg-gradient-to-tr from-primary-400 to-primary-600 p-4 text-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 container relative z-10 ">
                  <div className="md:col-span-2 space-y-2">
                    <Link href="/">
                      <Image
                        as={NextImage}
                        src={"/logos/logo.png"}
                        alt={"company logo"}
                        width={500}
                        height={500}
                        className="w-32 aspect-auto"
                      />
                    </Link>
                    <h3 className="text-xl font-bold">{brand.name}</h3>
                    <p className="text-tiny prose-sm line-clamp-4 text-slate-200">
                      {about.aboutDescription}
                    </p>
                    <Link
                      size="sm"
                      href={adminPaths.dashboard}
                      isBlock
                      showAnchorIcon
                      color="foreground"
                    >
                      Professional Portal
                    </Link>
                    {/* <div className="flex justify-center items-center gap-10 *:size-6 *:cursor-pointer">
                      <Link
                        href="https://www.facebook.com/grttours"
                        target="_blank"
                      >
                        <Tooltip content="Facebook" size="md">
                          <Facebook />
                        </Tooltip>
                      </Link>
                      <Link
                        href="https://www.instagram.com/grt_tours"
                        target="_blank"
                      >
                        <Tooltip content="Instagram" size="md">
                          <Instagram />
                        </Tooltip>
                      </Link>
                      <Link
                        href="https://www.youtube.com/channel/UCbEvD-dLl66Dbqp4V0TncBw"
                        target="_blank"
                      >
                        <Tooltip content="Youtube" size="md">
                          <Youtube />
                        </Tooltip>
                      </Link>
                      <Link
                        href="https://www.pinterest.com/globalroamingtravelsandtours"
                        target="_blank"
                      >
                        <Tooltip content="Pinterest" size="md">
                          <MessageCircleHeart />
                        </Tooltip>
                      </Link>
                      <Link
                        href="https://www.linkedin.com/company/global-roaming-travel-tours/"
                        target="_blank"
                      >
                        <Tooltip content="Linkedin" size="md">
                          <Linkedin />
                        </Tooltip>
                      </Link>
                    </div> */}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Quick Links</h3>
                    <ul className="text-small space-y-1">
                      {links.map((link) => (
                        <li key={link.href}>
                          <Link
                            className="hover:color-background hover:text-background text-small text-primary-50 transition-all duration-300"
                            href={link.href}
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-wrap">
                    {addresses && numbers && emails && (
                      <>
                        <h3 className="text-xl font-bold">Contact</h3>
                        <ul className="text-small space-y-2 ">
                          <li key={numbers[0].number}>
                            <Link
                              href={"tel:" + numbers[0].number}
                              className="hover:color-background hover:text-background text-small text-primary-50 transition-all duration-300"
                            >
                              {numbers[0].number}
                            </Link>
                          </li>
                          <li key={emails[0].email}>
                            <Link
                              href={"mailto:" + emails[0].email}
                              className="hover:color-background hover:text-background text-small text-primary-50 transition-all duration-300"
                            >
                              {emails[0].email}
                            </Link>
                          </li>
                          <li key={addresses[0].address}>
                            <Link
                              href={addresses[0].addressLink}
                              className="hover:color-background hover:text-background text-small text-primary-50 transition-all duration-300"
                            >
                              {addresses[0].address}
                            </Link>
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                <div className="relative z-10 text-tiny md:text-base flex justify-center items-center mt-4">
                  Copyright &copy; Petmania. All Rights Reserved.
                  <p className="mx-2 text-tiny">
                    Developed by{" "}
                    <Link
                      href="https://umersagheer.dev"
                      className="text-tiny hover:text-background text-slate-200"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      Umer Sagheer
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </Await>
    </Suspense>
  );
}
