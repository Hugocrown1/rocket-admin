import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { NextResponse as response } from "next/server";

export async function POST(request) {
  await mongooseConnect();
  const { name, parentCategory } = await request.json();
  const categoryDoc = await Category.create({ name, parent: parentCategory });
  return response.json(categoryDoc);
}

export async function GET(request) {
  await mongooseConnect();
  return response.json(await Category.find().populate("parent"));
}

export async function PUT(request) {
  await mongooseConnect();
  const { name, parentCategory, _id } = await request.json();
  const categoryDoc = await Category.updateOne(
    { _id },
    { name, parent: parentCategory }
  );
  return response.json(categoryDoc);
}

export async function DELETE(request) {
  await mongooseConnect();
  const _id = request.nextUrl.searchParams.get("id");

  await Category.deleteOne({ _id });
  return response.json(true);
}
