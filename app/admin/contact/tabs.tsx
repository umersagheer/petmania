"use client";

import { adminPaths } from "@/config/constants";
import { Tabs, Tab } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function ContactTabs() {
  const pathname = usePathname();

  return (
    <Tabs aria-label="Options" selectedKey={pathname} color="primary">
      <Tab key={adminPaths.numbers} title="Numbers" href={adminPaths.numbers} />
      <Tab key={adminPaths.emails} title="Emails" href={adminPaths.emails} />
      <Tab
        key={adminPaths.addresses}
        title="Addresses"
        href={adminPaths.addresses}
      />
    </Tabs>
  );
}
