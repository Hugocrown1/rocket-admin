import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse as response } from "next/server";

const BUCKET_NAME = "rocket-admin";
export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  const bytes = await file.arrayBuffer();
  //Función experimental, cambiar luego
  const buffer = Buffer.from(bytes);

  const client = new S3Client({
    region: "us-west-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const ext = file.name.split(".").pop();
  const newFileName = Date.now() + "." + ext;

  client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: newFileName,
      Body: buffer,
      ACL: "public-read",
      ContentType: file.type,
    })
  );
  const link = `https://${BUCKET_NAME}.s3.amazonaws.com/${newFileName}`;
  return response.json(link);
}
