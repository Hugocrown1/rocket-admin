import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

import { NextResponse as response } from "next/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function POST(request) {
  await mongooseConnect();
  await isAdminRequest();
  const { name, parentCategory, properties } = await request.json();
  const categoryDoc = await Category.create({
    name,
    parent: parentCategory || undefined,
    properties,
  });
  return response.json(categoryDoc);
}

export async function GET(request) {
  await mongooseConnect();
  await isAdminRequest();
  return response.json(await Category.find().populate("parent"));
}

export async function PUT(request) {
  await mongooseConnect();
  const { name, parentCategory, properties, _id } = await request.json();
  const categoryDoc = await Category.updateOne(
    { _id },
    { name, parent: parentCategory || undefined, properties }
  );
  return response.json(categoryDoc);
}

export async function DELETE(request) {
  await mongooseConnect();
  const _id = request.nextUrl.searchParams.get("id");

  await Category.deleteOne({ _id });
  return response.json(true);
}
