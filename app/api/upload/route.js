import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse as response } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  console.log("form data", formData, file);
  return response.json("ok");
}

export const config = {
  api: { bodyParser: false },
};
