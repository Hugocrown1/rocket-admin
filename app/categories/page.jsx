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
  const [properties, setProperties] = useState([]);

  const fetchCategories = () => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  };

  //TODO: Arreglar bug de crear categorías sin padre
  const saveCategory = async (e) => {
    e.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((property) => ({
        name: property.name,
        values: property.values.split(","),
      })),
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
      setParentCategory("");
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);

    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  };

  const openModal = (category) => {
    setDeletedCategory(category);
    onOpen();
  };

  //4:52:00
  const deleteCategory = async () => {
    await axios.delete(`/api/categories?id=${deletedCategory._id}`);

    fetchCategories();

    setDeletedCategory(null);
  };
  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };

  const handlePropertyValuesChange = (index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };

  const removeProperty = (indexToRemove) => {
    setProperties((prev) => {
      const newProperties = [...prev];
      return newProperties.filter(
        (property, propertyIndex) => propertyIndex !== indexToRemove
      );
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <h1>Categorías</h1>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Eliminar categoría</ModalHeader>
          <ModalBody>
            <p className="text-center">
              ¿Esta seguro que quiere eliminar la categoría
              <span className="font-bold"> {deletedCategory?.name}</span>?
            </p>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <Button
              className="text-white bg-[#d90429] hover:bg-[#9e3345] "
              onClick={() => {
                deleteCategory();
                onClose();
              }}
            >
              Si, eliminar
            </Button>
            <Button
              className="hover:bg-zinc-500 bg-zinc-600 text-white"
              onClick={() => {
                setDeletedCategory(null);
                onClose();
              }}
            >
              No
            </Button>
          </ModalFooter>
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
        <label htmlFor="properties">Propiedades</label>
        {properties.length > 0 &&
          properties.map((property, index) => (
            <div key={index} className="flex space-x-1 items-center">
              <input
                type="text"
                placeholder="Nombre de la propiedad (Ej: color)"
                value={property.name}
                onChange={(e) =>
                  handlePropertyNameChange(index, property, e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Valores, separados por coma"
                onChange={(e) =>
                  handlePropertyValuesChange(index, property, e.target.value)
                }
                value={property.values}
              />
              <Button
                onClick={() => removeProperty(index)}
                className="text-white bg-[#d90429] hover:bg-[#9e3345] "
              >
                Borrar
              </Button>
            </div>
          ))}
        <Button className="hover:bg-slate-500 w-fit" onClick={addProperty}>
          Agregar nueva propiedad...
        </Button>
        <div className="flex ">
          <button type="submit" className="primary-button w-fit h-fit">
            Guardar
          </button>
          {editedCategory && (
            <button
              className="red-button w-fit"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
      {!editedCategory && (
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
                    <button
                      className="bg-blue-700 hover:bg-blue-800 text-white text-sm p-1 px-2 mr-2 rounded-md inline-flex gap-1 items-center
                    "
                      onClick={() => editCategory(category)}
                    >
                      <IconEdit /> Editar
                    </button>
                    <button
                      className="bg-blue-700 hover:bg-blue-800 text-white text-sm p-1 px-2 mr-2 rounded-md inline-flex gap-1 items-center
                    "
                      onClick={() => openModal(category)}
                    >
                      <IconTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default Categories;
