"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <Layout>
      <Link
        className="text-white bg-blue-700 hover:bg-blue-800 items-center flex w-fit space-x-2 px-4 py-2 rounded-md"
        href={"products/new"}
      >
        <IconPlus /> <p>Nuevo producto</p>
      </Link>

      <table className="basic">
        <thead>
          <tr>
            <td className="text-white">Nombre del producto</td>
            <td className="text-white">Precio</td>
            <td className="text-white">Acciones</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <Link
                  className="bg-blue-700 hover:bg-blue-800"
                  href={`/products/edit/${product._id}`}
                >
                  <IconEdit size={19} />
                  Editar
                </Link>
                <Link
                  className="bg-[#d90429] hover:bg-[#9e3345]"
                  href={`/products/delete/${product._id}`}
                >
                  <IconTrash size={19} />
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
