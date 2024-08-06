import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { bannerSchema } from "@/validations/server/admin-validations.server";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const session = await getServerSession();
  try {
    const body = await req.json();

    const { image, productId } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    await bannerSchema.validate(body, { abortEarly: false });

    const banner = await prisma.banner.create({
      data: {
        image,
        ...(productId && {
          product: {
            connect: { id: productId },
          },
        }),
      },
    });
    revalidatePath("/");
    return NextResponse.json(banner);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return new NextResponse("Banner already exists", { status: 400 });
    } else if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[BANNERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const banners = await prisma.banner.findMany();
    return NextResponse.json(banners);
  } catch (error) {
    console.log("[BANNERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
