import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { productSchema } from "@/validations/server/admin-validations.server";

export async function POST(req: Request) {
  const session = await getServerSession();
  try {
    const body = await req.json();

    const {
      title,
      description,
      type,
      ingredients,
      benefits,
      calorieContent,
      guaranteedAnalysis,
      images,
      tagIds,
      dealIds,
      weightIds,
    } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    await productSchema.validate(body, { abortEarly: false });

    const product = await prisma.product.create({
      data: {
        title,
        description,
        type,
        ingredients,
        calorieContent,
        benefits,
        guaranteedAnalysis,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        tags: {
          connect: tagIds.map((tagId: any) => ({ id: tagId })),
        },
        deals: {
          connect: dealIds.map((dealId: any) => ({ id: dealId })),
        },
        weights: {
          connect: weightIds.map((weightId: any) => ({ id: weightId })),
        },
      },
    });
    revalidatePath("/");
    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
