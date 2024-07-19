"use client";

import { adminPaths } from "@/config/constants";
import { Tabs, Tab } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function ProductTabs() {
  const pathname = usePathname();

  return (
    <Tabs aria-label="Options" selectedKey={pathname} color="primary">
      <Tab key={adminPaths.deals} title="Deals" href={adminPaths.deals} />
      <Tab key={adminPaths.tags} title="Tags" href={adminPaths.tags} />
      <Tab key={adminPaths.weights} title="Weights" href={adminPaths.weights} />
    </Tabs>
  );
}
