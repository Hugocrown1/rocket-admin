"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IconRocket } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-[#0a0908] text-white px-6 py-2 h-16 flex justify-between items-center border-b-1 border-gray-500/25">
      {/* Banner */}
      <Link
        href={"/"}
        className="flex flex-row h-[7%] items-center justify-center gap-x-1"
      >
        <IconRocket color="white" size={40} />
        <span className="font-medium text-2xl">Rocket Admin</span>
      </Link>

      <Dropdown>
        <DropdownTrigger>
          <div className="flex space-x-3 text-sm text-white hover:cursor-pointer">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              name={session?.user?.name}
              size="md"
              src={session?.user?.image}
            />
            <p>
              {session?.user?.name} <br /> Admin
            </p>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile actions">
          <DropdownItem
            aria-label="avatar-item"
            key="profile"
            className="h-14 gap-2"
          >
            <p className="font-semibold">Iniciaste sesion como:</p>
            <p className="font-semibold">{session?.user?.email}</p>
          </DropdownItem>
          <DropdownItem
            aria-label="avatar-logout"
            key="settings"
            color="default"
          >
            Ajustes
          </DropdownItem>
          <DropdownItem
            aria-label="avatar-logout"
            key="logout"
            color="danger"
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/",
              })
            }
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  );
};

export default Header;
