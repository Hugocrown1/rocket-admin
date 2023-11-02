"use client";

import Nav from "@/components/Nav";
import { Spinner } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Header from "./Header";

export default function Layout({ children }) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#f8f9fa] text-black">
      <Header />
      <div className="flex flex-row min-h-screen">
        <Nav />
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  );
}
