import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { testimonialSchema } from "@/validations/server/admin-validations";
import { deleteImage } from "@/libs/cloudinary-utils";
import { extractPublicId } from "@/libs/utils";

export async function GET(
  req: Request,
  { params }: { params: { testimonialId: string } }
) {
  try {
    if (!params.testimonialId) {
      return new NextResponse("testimonialId ID is required", { status: 400 });
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id: params.testimonialId,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_GET]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { testimonialId: string } }
) {
  try {
    const session = getServerSession();
    const body = await req.json();
    const { name, description, image, rating } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    await testimonialSchema.validate(body, { abortEarly: false });

    if (!params.testimonialId) {
      return new NextResponse("Testimonial ID is required", { status: 400 });
    }

    const testimonial = await prisma.testimonial.updateMany({
      where: {
        id: params.testimonialId,
      },
      data: {
        name,
        description,
        image,
        rating,
      },
    });

    revalidatePath("/");

    return NextResponse.json(testimonial);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[TESTIMONIALS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { testimonialId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.testimonialId) {
      return new NextResponse("Testimonial ID is required", { status: 400 });
    }

    // deleting the image from cloudinary
    const data = await prisma.testimonial.findUnique({
      where: {
        id: params.testimonialId,
      },
    });

    if (!data) {
      return new NextResponse("Testimonial not found", { status: 404 });
    }

    const public_id = extractPublicId(data.image);
    if (!public_id) {
      return new NextResponse("Image not found", { status: 404 });
    }
    await deleteImage(public_id);

    const testimonial = await prisma.testimonial.deleteMany({
      where: {
        id: params.testimonialId,
      },
    });

    revalidatePath(`/`);

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_DELETE]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}
