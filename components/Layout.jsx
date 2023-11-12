"use client";

import Nav from "@/components/Nav";
import { Spinner } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Header from "./Header";
import {
  IconArmchair2,
  IconBoxSeam,
  IconCategory,
  IconTruckDelivery,
} from "@tabler/icons-react";

import { useState } from "react";
import Link from "next/link";

export default function Layout({ children }) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const [active, setActive] = useState(false);

  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Spinner />
      </div>
    );
  }

  const routes = [
    {
      route: "/",
      name: "Inicio",
      icon: <IconArmchair2 size={30} />,
    },
    {
      route: "/products",
      name: "Productos",
      icon: <IconBoxSeam size={30} />,
    },
    {
      route: "/categories",
      name: "Categorías",
      icon: <IconCategory size={30} />,
    },
    {
      route: "/orders",
      name: "Ordenes",
      icon: <IconTruckDelivery size={30} />,
    },
  ];

  return (
    <div className="flex flex-col bg-[#f8f9fa] text-black">
      <Header />
      <header className="bg-[#0a0908] text-white px-6 py-2 h-12 min-[1100px]:hidden flex justify-between items-center border-b-1 border-gray-500/25">
        <input
          id="checkbox"
          type="checkbox"
          checked={active}
          onChange={() => setActive(!active)}
        />
        <label className="toggle" htmlFor="checkbox">
          <div id="bar1" className="bars"></div>
          <div id="bar2" className="bars"></div>
          <div id="bar3" className="bars"></div>
        </label>
      </header>

      <div className="flex flex-row min-h-screen">
        <aside
          className={`absolute bg-[#0a0908] min-[1100px]:hidden min-h-screen z-10 text-white transition-transform transform ${
            active ? "translate-x-0" : "-translate-x-24"
          }`}
        >
          <nav>
            <ul>
              {routes.map((route, index) => (
                <li
                  className="my-2 mx-2 border-b-1 border-gray-400/20"
                  key={index}
                >
                  <Link href={route.route}>
                    <div className="flex flex-col items-center justify-center text-center">
                      {route.icon} {route.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <Nav />
        <main className="relative flex-grow p-4">{children}</main>
      </div>
    </div>
  );
}
