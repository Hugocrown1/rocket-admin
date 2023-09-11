"use client";

import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
  //TODO: Bajar los productos de la base de datos

  return (
    <Layout>
      <Link className="primary-button" href={"products/new"}>
        Nuevo producto
      </Link>
    </Layout>
  );
}
