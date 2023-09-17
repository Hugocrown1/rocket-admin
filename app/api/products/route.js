import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse as response } from "next/server";

export async function POST(request) {
  await mongooseConnect();

  const data = await request.json();

  const { title, description, price } = data;

  const productDoc = await Product.create({
    title,
    description,
    price,
  });

  return response.json(productDoc);
}

export async function GET(request) {
  await mongooseConnect();

  return response.json(await Product.find())
}
