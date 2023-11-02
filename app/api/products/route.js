import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse as response } from "next/server";

import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    await isAdminRequest();
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
  } catch (error) {
    if (error === "not admin") {
      return response.json({ error: "Not authorized" }, { status: 401 });
    } else {
      return response.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}

export async function GET(request) {
  try {
    await isAdminRequest();
    await mongooseConnect();

    const id = request.nextUrl.searchParams.get("id");

    if (id) {
      return response.json(await Product.findById(id));
    } else {
      return response.json(await Product.find());
    }
  } catch (error) {
    if (error === "not admin") {
      return response.json({ error: "Not authorized" }, { status: 401 });
    } else {
      return response.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}

export async function PUT(request) {
  try {
    await isAdminRequest();
    await mongooseConnect();

    const { title, description, price, images, category, properties, _id } =
      await request.json();
    const updatedProduct = await Product.updateOne(
      { _id },
      { title, description, price, images, category, properties }
    );
    return response.json(updatedProduct);
  } catch (error) {
    if (error === "not admin") {
      return response.json({ error: "Not authorized" }, { status: 401 });
    } else {
      return response.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}

export async function DELETE() {
  try {
    await isAdminRequest();
    await mongooseConnect();
    const id = request.nextUrl.searchParams.get("id");
    const deletedProduct = await Product.deleteOne({ _id: id });

    return response.json(deletedProduct);
  } catch (error) {
    if (error === "not admin") {
      return response.json({ error: "Not authorized" }, { status: 401 });
    } else {
      return response.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}
