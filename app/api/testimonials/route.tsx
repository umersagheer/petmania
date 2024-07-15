import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { testimonialSchema } from "@/validations/server/admin-validations";

export async function POST(req: Request) {
  const session = await getServerSession();
  try {
    const body = await req.json();

    const { name, description, image, rating } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    await testimonialSchema.validate(body, { abortEarly: false });

    const testimonial = await prisma.testimonial.create({
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

export async function GET(req: Request) {
  try {
    const testimonials = await prisma.testimonial.findMany();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.log("[TESTIMONIALS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
