"use client";

import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex bg-blue-950 w-screen h-screen items-center justify-center ">
        <button
          onClick={() => signIn("google")}
          className="bg-white text-black p-4 rounded-md"
        >
          Iniciar sesión con Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row bg-[#f8f9fa] text-black min-h-screen">
      <Nav />
      <div className=" flex-grow p-4">{children}</div>
    </div>
  );
}
