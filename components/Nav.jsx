import {
  IconArmchair2,
  IconBoxSeam,
  IconCategory,
  IconLogout2,
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
  ];

  return (
    <aside className="bg-[#0a0908] w-[250px]">
      {/* Rutas del dashboard */}
      <nav className="py-4 text-white">
        <p className="text-sm font-medium mx-2  text-gray-400">DASHBOARD</p>
        {routes.map((item, index) => (
          <Link
            className="flex flex-row gap-x-2 p-2 transition-colors px-4 hover:bg-[#f8f9fa] hover:text-black"
            key={index}
            href={item.route}
          >
            {item.icon} {item.name}
          </Link>
        ))}
        <p className="text-sm font-medium mx-2 mt-2  text-gray-400">OPCIONES</p>
        <Link
          className="flex flex-row gap-x-2 p-2 transition-colors hover:bg-[#f8f9fa] hover:text-black"
          href="/settings"
        >
          <IconSettings /> Ajustes
        </Link>
        <button
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: "/",
            })
          }
          className="flex flex-row gap-x-2 p-2  w-full transition-colors hover:bg-[#f8f9fa] hover:text-black"
        >
          <IconLogout2 /> Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
