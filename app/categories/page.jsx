"use client";

import Layout from "@/components/Layout";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const Categories = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [deletedCategory, setDeletedCategory] = useState(null);
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");

  const fetchCategories = () => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  };

  //TODO: Arreglar bug de crear categorías sin padre
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

  const openModal = (category) => {
    setDeletedCategory(category);
    onOpen();
  };

  const deleteCategory = async () => {
    await axios.delete(`/api/categories?id=${deletedCategory._id}`);
    fetchCategories();
    setDeletedCategory(null);
    onClose();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <h1>Categorías</h1>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Eliminar categoría</ModalHeader>
              <ModalBody className="text-center">
                ¿Esta seguro que quiere eliminar la categoría{" "}
                {deletedCategory?.name}?
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  className="hover:bg-zinc-500 bg-zinc-600 text-white"
                  onPress={() => {
                    setDeletedCategory(null);
                    onClose();
                  }}
                >
                  No
                </Button>
                <Button
                  className="text-white bg-[#d90429] hover:bg-[#9e3345] "
                  onPress={deleteCategory}
                >
                  Si, eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
                  <button onClick={() => openModal(category)}>
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
