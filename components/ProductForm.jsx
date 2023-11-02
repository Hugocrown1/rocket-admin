/* eslint-disable @next/next/no-img-element */
import { Spinner } from "@nextui-org/react";
import { IconUpload } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

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
      <div className="flex flex-row mb-2 space-x-2">
        <ReactSortable
          className="flex space-x-2"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link, index) => {
              return (
                <div
                  key={index}
                  className="relative h-28 w-28 inline-block rounded-md"
                >
                  <img
                    className="rounded-md"
                    src={link}
                    alt={`fotografía del producto numero ${index + 1}`}
                  />
                </div>
              );
            })}
        </ReactSortable>
        {isUploading && (
          <div className="flex relative h-28 w-28 items-center justify-center">
            <Spinner size="lg" color="primary"></Spinner>
          </div>
        )}
        <label
          htmlFor="photos"
          className="flex flex-col items-center justify-center w-28 h-28 bg-slate-300 rounded-md text-gray-500 cursor-pointer"
        >
          <IconUpload />
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
      <button type="submit" className="primary-button w-28 mt-2">
        Guardar
      </button>
    </form>
  );
}
