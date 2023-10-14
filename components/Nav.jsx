import {
  IconArmchair2,
  IconBoxSeam,
  IconCategory,
  IconLogout2,
  IconPower,
  IconRocket,
  IconSettings,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Nav() {
  const routes = [
    {
      route: "/",
      name: "Inicio",
      icon: <IconArmchair2 />,
    },
    {
      route: "/products",
      name: "Productos",
      icon: <IconBoxSeam />,
    },
    {
      route: "/categories",
      name: "Categorías",
      icon: <IconCategory />,
    },
    {
      route: "/orders",
      name: "Ordenes",
      icon: <IconTruckDelivery />,
    },
    {
      route: "/settings",
      name: "Ajustes",
      icon: <IconSettings />,
    },
  ];
  return (
    <aside className="bg-[#0a0908] min-w-fit w-[16%]">
      {/* Banner */}
      <Link
        href={"/"}
        className="flex flex-row bg-[#242423] text-white h-[7%] items-center justify-center gap-x-1"
      >
        <IconRocket color="white" size={40} />
        <span className="font-medium text-2xl">Rocket Admin</span>
      </Link>
      {/* Rutas del dashboard */}
      <nav className="p-4 text-white">
        {routes.map((item, index) => (
          <Link
            className="flex flex-row gap-x-2 p-2 rounded-md hover:bg-[#ffffff3d]"
            key={index}
            href={item.route}
          >
            {item.icon} {item.name}
          </Link>
        ))}
        <button
          onClick={signOut}
          className="flex flex-row gap-x-2 p-2 rounded-md w-full hover:bg-[#ffffff3d]"
        >
          <IconLogout2 /> Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
