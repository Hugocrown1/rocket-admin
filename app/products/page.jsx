"use client";

import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
  return (
    <Layout>
      <Link className="primary-button" href={"products/new"}>
        Nuevo producto
      </Link>
    </Layout>
  );
}
