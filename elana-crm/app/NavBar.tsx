"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import DarkModeSwitch from "../components/DarkModeSwitch";
import { Button, ChevronDownIcon, Flex } from "@radix-ui/themes";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const [isClientMenuOpen, setIsClientMenuOpen] = useState(false);
  const [isJourneyMenuOpen, setIsJourneyMenuOpen] = useState(false);

  const links = [{ label: "Dashboard", href: "/" }];

  const clientLinks = [
    { label: "Clients", href: "/clients" },
    { label: "Demo Clients", href: "/demo-clients" },
  ];

  const userJourneyLinks = [{ label: "Expired IDs", href: "/expired_ids" }];

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

        <button
          onClick={() => setIsClientMenuOpen((prev) => !prev)}
          className="text-md font-semibold text-zinc-500 hover:text-zinc-700 transition-colors flex items-center gap-2"
        >
          {isClientMenuOpen ? <ChevronDownIcon /> : <ChevronRightIcon />} Client
          Management
        </button>

        {isClientMenuOpen && (
          <Flex direction="column" className="ml-4 space-y-2">
            {clientLinks.map((link) => (
              <Link
                key={link.href}
                className={classnames(
                  "text-sm font-semibold hover:text-zinc-700 transition-colors",
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
          </Flex>
        )}

        <button
          onClick={() => setIsJourneyMenuOpen((prev) => !prev)}
          className="text-md font-semibold text-zinc-500 hover:text-zinc-700 transition-colors flex items-center gap-2"
        >
          {isJourneyMenuOpen ? <ChevronDownIcon /> : <ChevronRightIcon />} User
          Journeys
        </button>

        {isJourneyMenuOpen && (
          <Flex direction="column" className="ml-4 space-y-2">
            {userJourneyLinks.map((link) => (
              <Link
                key={link.href}
                className={classnames(
                  "text-sm font-semibold hover:text-zinc-700 transition-colors",
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
          </Flex>
        )}
      </ul>

      <Flex direction="column" gap="3" align="start" className="mt-auto">
        {status === "loading" && <div>Loading...</div>}
        {status === "authenticated" && (
          <div className="text-sm">
            <div className="mb-2">{session.user!.name}</div>
            <Link
              href={"/api/auth/signout"}
              className="text-blue-600 hover:underline"
            >
              <Button variant="soft" color="blue">
                Sign out
              </Button>
            </Link>
          </div>
        )}
        {status === "unauthenticated" && (
          <Link
            href={"/api/auth/signin"}
            className="text-blue-600 hover:underline"
          >
            <Button variant="soft" color="blue">
              Login
            </Button>
          </Link>
        )}
        <DarkModeSwitch />
      </Flex>
    </nav>
  );
};

export default NavBar;
