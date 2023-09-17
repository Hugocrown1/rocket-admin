'use client'

import Layout from "@/components/Layout"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function EditProductPage() {
    const params = useParams()

    const [id] = params.id

    //TODO: Cargar el producto por su id
    useEffect(() => {
      
    
     
    }, [])
    
    

    return (<Layout>
        Edita el producto

    </Layout>)
    
}