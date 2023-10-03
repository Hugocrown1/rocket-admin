"use client";

import Layout from "@/components/Layout";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");

  const fetchCategories = () => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  };
  const saveCategory = async (e) => {
    e.preventDefault();
    const data = { name, parentCategory };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
      setParentCategory("");
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    fetchCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <h1>Categorías</h1>
      <form
        onSubmit={saveCategory}
        className="flex flex-col space-y-2 mt-2 w-full"
      >
        <label htmlFor="category-name">
          {editedCategory
            ? `Editar categoría ${editedCategory.name}`
            : "Nueva categoría"}
        </label>
        <div className="flex flex-row space-x-1">
          <input
            id="category-name"
            type="text"
            placeholder="Nombre de la categoría"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="w-[20%]"
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="">Sin categoría padre</option>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <option value={category._id} key={index}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <button type="submit" className="primary-button w-fit h-fit">
          Guardar
        </button>
      </form>
      <table className="basic text-white">
        <thead>
          <tr>
            <td>Nombre de la categoría</td>
            <td>Categoría padre</td>
            <td></td>
          </tr>
        </thead>
        <tbody className="text-black">
          {categories.length > 0 &&
            categories.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
                <td>{category.parent?.name}</td>
                <td>
                  <button onClick={() => editCategory(category)}>
                    <IconEdit /> Editar
                  </button>
                  <button>
                    <IconTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Categories;
