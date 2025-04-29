"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const currentPath = usePathname();
  const {status, data:session} = useSession();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Clients", href: "/clients" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-16 items-center justify-between">
        <Link href="/">
          <Image
            src="/images/elana-logo.jpg"
            alt="logo"
            width={140}
            height={80}
            style={{ height: "auto" }}
            priority
          />
        </Link>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              className={classnames({
                "text-zinc-900": currentPath === link.href,
                "text-zinc-500": currentPath !== link.href,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </ul>
        <div>
        {status === "loading" && <div>Loading...</div>}
        {status === 'authenticated' && <div>{session.user!.name}<Link href={"/api/auth/signout"} className='ml-3'>Sign out</Link></div>}
        {status === 'unauthenticated' && <Link href={"/api/auth/signin"}>Login</Link>}
      </div>
    </nav>
  );
};

export default NavBar;
