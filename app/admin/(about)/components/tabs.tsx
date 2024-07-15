"use client";

import { adminPaths } from "@/config/constants";
import { Tabs, Tab } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function AboutTabs() {
  const pathname = usePathname();

  return (
    <Tabs aria-label="Options" selectedKey={pathname} color="primary">
      <Tab key={adminPaths.about} title="About" href={adminPaths.about} />
      <Tab
        key={adminPaths.testimonials}
        title="Testimonials"
        href={adminPaths.testimonials}
      />
    </Tabs>
  );
}
