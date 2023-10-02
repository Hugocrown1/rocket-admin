"use client";

import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  };
  const saveCategory = async (e) => {
    e.preventDefault();
    await axios.post("/api/categories", { name });
    setName("");
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <h1>Categorías</h1>
      <form onSubmit={saveCategory} className="flex flex-col space-y-2 mt-2 ">
        <label htmlFor="category-name">Nueva categoría</label>
        <input
          id="category-name"
          type="text"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="primary-button w-fit">
          Guardar
        </button>
      </form>
      <table className="basic text-white">
        <thead>
          <tr>
            <td>Nombre de la categoría</td>
          </tr>
        </thead>
        <tbody className="text-black">
          {categories.length > 0 &&
            categories.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Categories;
