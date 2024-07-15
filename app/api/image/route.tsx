import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { deleteImage } from "@/libs/cloudinary-utils";

export async function POST(req: Request) {
  const session = await getServerSession();
  try {
    const body = await req.json();

    const { public_id } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!public_id) {
      return new NextResponse("All fields Required", { status: 400 });
    }
    await deleteImage(public_id);

    return new NextResponse("Image deleted successfully", { status: 200 });
  } catch (error) {
    console.log("[IMAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
