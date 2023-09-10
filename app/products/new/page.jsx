"use client";

import Layout from "@/components/Layout";
import { useState } from "react";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const createProduct = () => {
    e.preventDefault();
  };
  return (
    <Layout>
      <div className="flex flex-col gap-y-2">
        <h1>Nuevo producto</h1>
        <form onSubmit={createProduct}>
          <label htmlFor="new_product">Nombre del producto</label>
          <input
            id="new_product"
            type="text"
            placeholder="Nombre del producto..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            placeholder="Descripción..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="price">Precio (MXN)</label>
          <input
            id="price"
            type="number"
            placeholder="Precio..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit" className="primary-button w-28">
            Guardar
          </button>
        </form>
      </div>
    </Layout>
  );
}
