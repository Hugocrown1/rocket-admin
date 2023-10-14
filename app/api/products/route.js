import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse as response } from "next/server";

export async function POST(request) {
  await mongooseConnect();

  const data = await request.json();

  const { title, description, price, images, category, properties } = data;

  const productDoc = await Product.create({
    title,
    description,
    price,
    images,
    category,
    properties,
  });

  return response.json(productDoc);
}

export async function GET(request) {
  await mongooseConnect();
  const id = request.nextUrl.searchParams.get("id");

  //Si se hace una solicitud con un query de búsqueda se regresa un producto, si no, se regresan todos los productos
  if (id) {
    return response.json(await Product.findById(id));
  } else {
    return response.json(await Product.find());
  }
}

export async function PUT(request) {
  await mongooseConnect();
  const { title, description, price, images, category, properties, _id } =
    await request.json();
  await Product.updateOne(
    { _id },
    { title, description, price, images, category, properties }
  );
  return response.json(true);
}

export async function DELETE(request) {
  await mongooseConnect();
  const id = request.nextUrl.searchParams.get("id");
  await Product.deleteOne({ _id: id });

  return response.json(true);
}
