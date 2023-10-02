import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { NextResponse as response } from "next/server";

export async function POST(request) {
  await mongooseConnect();
  const { name } = await request.json();
  const categoryDoc = await Category.create({ name });
  return response.json(categoryDoc);
}

export async function GET(request) {
  await mongooseConnect();
  return response.json(await Category.find());
}
