import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { productSchema } from "@/validations/server/admin-validations.server";
import { extractPublicIds } from "@/libs/utils";
import { deleteImages } from "@/libs/cloudinary-utils";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("email ID is required", { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = getServerSession();
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
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    await productSchema.validate(body, { abortEarly: false });

    if (!params.productId) {
      return new NextResponse("product ID is required", { status: 400 });
    }

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        title,
        description,
        type,
        ingredients,
        calorieContent,
        guaranteedAnalysis,
        benefits,
        images: {
          deleteMany: {},
          create: images.map((image: { url: string }) => ({ url: image.url })),
        },
        tags: {
          set: tagIds.map((tagId: string) => ({ id: tagId })),
        },
        deals: {
          set: dealIds.map((dealId: string) => ({ id: dealId })),
        },
        weights: {
          set: weightIds.map((weight: string) => ({ id: weight })),
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

    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("email ID is required", { status: 400 });
    }

    // finding and then deleting the images from cloudinary
    const imagesURL = await prisma.product.findFirst({
      where: {
        id: params.productId,
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    const publicIds = extractPublicIds(imagesURL?.images as { url: string }[]);

    await deleteImages(publicIds as string[]);

    const product = await prisma.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    revalidatePath(`/`);

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}
