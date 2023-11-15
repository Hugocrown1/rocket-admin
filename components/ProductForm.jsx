/* eslint-disable @next/next/no-img-element */
import { Spinner } from "@nextui-org/react";
import { IconDots, IconUpload } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [category, setCategory] = useState(existingCategory || "");

  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );

  const [isUploading, setIsUploading] = useState(false);

  const [images, setImages] = useState(existingImages || "");

  const router = useRouter();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  //TODO: Manejo de errores
  const saveProduct = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };

    if (_id) {
      //Actualizar producto
      await axios.put("/api/products", { ...data, _id });
    } else {
      //Crear producto
      await axios.post("/api/products", data);
    }
    //Regresar a la pagina de productos
    router.push("/products");
  };

  const uploadImages = async (e) => {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }

      const response = await axios.post("/api/upload", data);

      setImages((oldImages) => {
        return [...oldImages, response.data];
      });
      setIsUploading(false);
    }
  };

  const updateImagesOrder = (images) => {
    setImages(images);
  };

  const setProductProp = (propName, value) => {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  };

  //Desvincular link del producto
  const deleteImage = async (imageLink) => {
    const parts = imageLink.split("/");
    const imageName = parts[parts.length - 1];

    const response = await axios.delete(`/api/upload?image=${imageName}`);
  };

  const propertiesToFill = [];

  if (categories.length > 0 && category) {
    let categoryInfo = categories.find(({ _id }) => _id === category);
    if (categoryInfo) {
      propertiesToFill.push(...categoryInfo.properties);
      while (categoryInfo?.parent?._id) {
        const parentCategory = categories.find(
          ({ _id }) => _id === categoryInfo?.parent?._id
        );
        propertiesToFill.push(...parentCategory.properties);
        categoryInfo = parentCategory;
      }
    }
  }

  return (
    <form className="my-2" onSubmit={saveProduct}>
      <label htmlFor="new_product">Nombre del producto</label>
      <input
        required
        id="new_product"
        type="text"
        placeholder="Nombre del producto..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="category-select">Categoría</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        name="category"
        id="category-select"
      >
        <option value="">Sin categoría</option>
        {categories.length > 0 &&
          categories.map((category, index) => (
            <option key={index} value={category._id}>
              {category.name}
            </option>
          ))}
      </select>

      {propertiesToFill.length > 0 && (
        <label htmlFor="properties-select">Propiedades</label>
      )}
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((property, index) => (
          <div className="flex gap-1 my-2 items-center" key={index}>
            <div>{property.name}</div>
            <select
              value={productProperties[property.name]}
              onChange={(e) => setProductProp(property.name, e.target.value)}
              name="properties"
              id="properties"
            >
              {property.values.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
      {/* Fotos */}
      <label htmlFor="photos">Fotos</label>
      <div className="flex flex-wrap mb-3 h-fit">
        <ReactSortable
          className="flex flex-wrap"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link, index) => {
              return (
                <div
                  key={index}
                  className={`inline-block relative h-48 w-48 rounded-md m-1 `}
                >
                  <Dropdown>
                    <DropdownTrigger>
                      <button className="absolute bg-gray-300/60 px-1 rounded-lg translate-x-1 translate-y-1">
                        <IconDots />
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Image Actions">
                      <DropdownItem aria-label="view-option" key="view">
                        Ver
                      </DropdownItem>
                      <DropdownItem
                        aria-label="delete-image"
                        key="delete"
                        className="text-danger"
                        color="danger"
                      >
                        <button onClick={() => deleteImage(link)}>
                          Eliminar imagen
                        </button>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <img
                    className=" rounded-md h-full w-full"
                    src={link}
                    alt={`fotografía del producto numero ${index + 1}`}
                  />
                </div>
              );
            })}
        </ReactSortable>
        {isUploading && (
          <div className="flex relative h-48 w-48 items-center justify-center m-1">
            <Spinner size="lg" color="primary"></Spinner>
          </div>
        )}

        <label
          htmlFor="photos"
          className="flex flex-col items-center m-1 justify-center w-48 h-48 bg-slate-300 rounded-md text-gray-500 text-2xl cursor-pointer"
        >
          <IconUpload size={32} />
          Cargar
          <input
            id="photos"
            type="file"
            className="hidden"
            onChange={uploadImages}
          />
        </label>
      </div>

      <label htmlFor="description">Descripción</label>
      <textarea
        required
        id="description"
        placeholder="Descripción..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="price">Precio (MXN)</label>
      <input
        required
        id="price"
        type="number"
        placeholder="Precio..."
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <div className="flex mt-2">
        <button type="submit" className="primary-button ">
          Guardar
        </button>
        <Link href={"/products"} className="red-button ">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
