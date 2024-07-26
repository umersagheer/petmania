import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { bannerSchema } from "@/validations/server/admin-validations.server";
import { deleteImage } from "@/libs/cloudinary-utils";
import { extractPublicId } from "@/libs/utils";

export async function GET(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  try {
    if (!params.bannerId) {
      return new NextResponse("bannerId ID is required", { status: 400 });
    }

    const banner = await prisma.banner.findUnique({
      where: {
        id: params.bannerId,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[TESTIMONIAL_GET]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  try {
    const session = getServerSession();
    const body = await req.json();
    const { title, image, productId } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    await bannerSchema.validate(body, { abortEarly: false });

    if (!params.bannerId) {
      return new NextResponse("Banner ID is required", { status: 400 });
    }

    const banner = await prisma.banner.update({
      where: {
        id: params.bannerId,
      },
      data: {
        title,
        image,
        product: {
          connect: productId ? { id: productId } : undefined,
        },
      },
    });

    revalidatePath("/");

    return NextResponse.json(banner);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[BANNER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.bannerId) {
      return new NextResponse("Banner ID is required", { status: 400 });
    }

    // deleting the image from cloudinary
    const data = await prisma.banner.findUnique({
      where: {
        id: params.bannerId,
      },
    });

    if (!data) {
      return new NextResponse("Banner not found", { status: 404 });
    }

    const public_id = extractPublicId(data.image);
    if (!public_id) {
      return new NextResponse("Image not found", { status: 404 });
    }
    await deleteImage(public_id);

    const banner = await prisma.banner.deleteMany({
      where: {
        id: params.bannerId,
      },
    });

    revalidatePath(`/`);

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[TESTIMONIAL_DELETE]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}
