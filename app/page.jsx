"use client";

import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">
          Bienvenido, <span className="font-bold">{session?.user?.name}</span>
        </h2>

        <div className="flex items-center gap-4 mr-8">
          <Image
            className="rounded-full"
            width={60}
            height={60}
            alt="Foto de perfil"
            src={session?.user?.image}
          />
          <p className="text-lg font text-left">
            {session?.user?.name} <br /> <span className="text-sm">Admin</span>{" "}
          </p>
        </div>
      </div>
    </Layout>
  );
}
