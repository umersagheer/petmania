"use client";

import { paths } from "@/config/admin-paths";
import { brand } from "@/config/constants";
import { rootPaths } from "@/config/root-paths";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";

const MainNavbar = () => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          tabIndex={0}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="gap-1 cursor-pointer">
          <Image
            src={brand.logo}
            alt={brand.alt}
            width={50}
            height={50}
            className="object-contain size-6"
          />
          <p className="font-bold text-medium md:text-large text-primary text-inherit">
            {brand.name}
          </p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        {rootPaths.map((item) => (
          <NavbarItem
            key={item.name}
            isActive={
              pathName === item.path || pathName.startsWith(item.path + "/")
            }
          >
            <Link
              href={item.path}
              color={
                (item.path === "/" && pathName === "/") ||
                (item.path !== "/" && pathName.includes(item.path))
                  ? "primary"
                  : "foreground"
              }
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent />

      <NavbarMenu>
        {rootPaths.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                (item.path === "/" && pathName === "/") ||
                (item.path !== "/" && pathName.includes(item.path))
                  ? "primary"
                  : "foreground"
              }
              className="w-full"
              href={item.path}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default MainNavbar;
