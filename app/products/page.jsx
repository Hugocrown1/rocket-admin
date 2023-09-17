"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconEdit } from "@tabler/icons-react";

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products')
    .then( res => {
      setProducts(res.data)
      
    }

    )
  
    
  }, [])
    

  return (
    <Layout>
      <Link className="primary-button" href={"products/new"}>
        Nuevo producto
      </Link>

      <table className="basic">
        <thead>
          <tr>
            <td>Nombre del producto</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map( (product, index) => (
            <tr key={index}>
              <td>{product.title}</td>
              <td>
                <Link href={`/products/edit/${product._id}`}>
                  <IconEdit size={19}/>
                  Editar
                </Link>
              </td>
            </tr>
          ) )}
        </tbody>
      </table>
    </Layout>
  );
}
