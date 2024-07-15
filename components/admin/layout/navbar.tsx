"use client";

import { paths } from "@/config/admin-paths";
import { brand } from "@/config/constants";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Avatar,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  User,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

const AdminNavbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();

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
          <p className="font-bold  text-medium md:text-large text-primary text-inherit">
            {brand.name}
          </p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {paths.map((item) => (
          <NavbarItem
            key={item.name}
            isActive={
              pathName === item.path || pathName.startsWith(item.path + "/")
            }
          >
            <Link
              href={item.path}
              color={pathName.startsWith(item.path) ? "primary" : "foreground"}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                showFallback
                fallback={session?.user?.name?.charAt(0)}
                src="/logos/logo-base-s.xng"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <User
                  name={session?.user?.name}
                  description={<p>{session?.user?.email}</p>}
                  avatarProps={{
                    fallback: (
                      <p className="text-large">
                        {session?.user?.name?.charAt(0)}
                      </p>
                    ),
                    src: session?.user?.image || "",
                  }}
                />
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {paths.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={pathName.startsWith(item.path) ? "primary" : "foreground"}
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

export default AdminNavbar;
