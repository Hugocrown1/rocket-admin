/* eslint-disable react/no-unescaped-entities */
"use client";

import Layout from "@/components/Layout";
import { deleteImage } from "@/lib/deleteImage";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
  const router = useRouter();
  const params = useParams();
  const [productInfo, setProductInfo] = useState();

  const [id] = params.id;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/products?id=" + id).then((res) => {
      setProductInfo(res.data);
    });
  }, [id]);

  const goBack = () => {
    router.push("/products");
  };

  const deleteProduct = async () => {
    if (productInfo.images.length > 0) {
      for (const imageLink of productInfo.images) {
        try {
          await deleteImage(imageLink);
        } catch (error) {
          console.error(`Error al eliminar la imagen ${imageLink}:`, error);
        }
      }
    }
    await axios.delete("/api/products?id=" + id);

    goBack();
  };

  //TODO: Hacerlo pop-up
  return (
    <Layout>
      <div className="flex flex-col items-center gap-2">
        <h1>¿Seguro que quieres eliminar "{productInfo?.title}"?</h1>
        <div className="flex flex-row">
          <button className="primary-button w-20" onClick={deleteProduct}>
            Si
          </button>
          <button className="red-button w-20" onClick={goBack}>
            No
          </button>
        </div>
      </div>
    </Layout>
  );
}
