"use client";

import { adminPaths } from "@/config/constants";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import AboutClient from "./client";
import TestimonialClient from "../testimonials/components/client";
import { useEffect, useState } from "react";

export default function AboutTabs() {
  const pathname = usePathname();
  const [isVertical, setIsVertical] = useState(true);

  const handleResize = () => {
    setIsVertical(window.innerWidth >= 768);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Tabs
      aria-label="Options"
      selectedKey={pathname}
      color="primary"
      isVertical={isVertical}
    >
      <Tab key={adminPaths.about} title="About" href={adminPaths.about}>
        <AboutClient />
      </Tab>
      <Tab
        key={adminPaths.testimonials}
        title="Testimonials"
        href={adminPaths.testimonials}
      >
        <TestimonialClient />
      </Tab>
    </Tabs>
  );
}
