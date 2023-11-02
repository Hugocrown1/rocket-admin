import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

import { NextResponse as response } from "next/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    await isAdminRequest();
    await mongooseConnect();
    const { name, parentCategory, properties } = await request.json();
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    return response.json(categoryDoc);
  } catch (error) {
    if (error === "not admin") {
      return response.json({ error: "Not authorized" }, { status: 401 });
    } else {
      return response.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}
// TODO: Middleware de autorización de usuario
export async function GET(request) {
  try {
    await isAdminRequest();
    await mongooseConnect();

    return response.json(await Category.find().populate("parent"));
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
    const { name, parentCategory, properties, _id } = await request.json();
    const categoryDoc = await Category.updateOne(
      { _id },
      { name, parent: parentCategory || undefined, properties }
    );
    return response.json(categoryDoc);
  } catch (error) {
    if (error === "not admin") {
      return response.json({ error: "Not authorized" }, { status: 401 });
    } else {
      return response.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}

export async function DELETE(request) {
  try {
    await isAdminRequest();
    await mongooseConnect();
    const _id = request.nextUrl.searchParams.get("id");

    const deletedCategory = await Category.deleteOne({ _id });
    return response.json(deletedCategory);
  } catch (error) {
    if (error === "not admin") {
      return response.json({ error: "Not authorized" }, { status: 401 });
    } else {
      return response.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}
