"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import DarkModeSwitch from "../components/DarkModeSwitch";
import { Flex } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Clients", href: "/clients" },
    { label: "Demo Clients", href: "/demo-clients" },
    { label: "Expired IDs", href: "/expired_ids" },
  ];

  return (
    <nav className="fixed top-0 left-0 flex flex-col w-60 flex-shrink-0 h-screen border-r px-5 py-6">
      <Link href="/" className="mb-10 flex justify-center">
        <Image
          src="/images/elana-logo.png"
          alt="logo"
          width={140}
          height={80}
          priority
        />
      </Link>

      <ul className="flex flex-col space-y-6 flex-grow">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames(
              "text-md font-semibold hover:text-zinc-700 transition-colors",
              {
                "text-zinc-900 bg-zinc-200 rounded-md p-2":
                  currentPath === link.href,
                "text-zinc-500": currentPath !== link.href,
              }
            )}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>

      <Flex direction="column" gap="3" align="start" className="mt-auto">
        {status === "loading" && <div>Loading...</div>}
        {status === "authenticated" && (
          <div className="text-sm">
            <div>{session.user!.name}</div>
            <Link
              href={"/api/auth/signout"}
              className="text-blue-600 hover:underline"
            >
              Sign out
            </Link>
          </div>
        )}
        {status === "unauthenticated" && (
          <Link
            href={"/api/auth/signin"}
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        )}
        <DarkModeSwitch />
      </Flex>
    </nav>
  );
};

export default NavBar;
