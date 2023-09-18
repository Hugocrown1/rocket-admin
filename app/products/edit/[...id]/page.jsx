'use client'

import Layout from "@/components/Layout"
import ProductForm from "@/components/ProductForm"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditProductPage() {
    const params = useParams()
    const [id] = params.id

    const [productInfo, setProductInfo] = useState(null)


    useEffect(() => {
        if(!id){
            return
        }
      axios.get('/api/products?id='+id)
      .then( res => {
        setProductInfo(res.data)
      })
    
     
    }, [id])
    
    

    return (<Layout>

       
        <h1 >Editar producto</h1>
        { productInfo && <ProductForm {...productInfo}/>}
    
      </Layout>)
    
}