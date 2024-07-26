import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { tagSchema } from "@/validations/server/admin-validations.server";

export async function GET(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    if (!params.tagId) {
      return new NextResponse("tag ID is required", { status: 400 });
    }

    const tag = await prisma.tag.findUnique({
      where: {
        id: params.tagId,
      },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.log("[TAG_GET]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    const session = getServerSession();
    const body = await req.json();
    const { name } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    await tagSchema.validate(body, { abortEarly: false });

    if (!params.tagId) {
      return new NextResponse("NUmber ID is required", { status: 400 });
    }

    const tag = await prisma.tag.updateMany({
      where: {
        id: params.tagId,
      },
      data: {
        name,
      },
    });

    revalidatePath("/");

    return NextResponse.json(tag);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[TAG_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.tagId) {
      return new NextResponse("tag ID is required", { status: 400 });
    }

    const tag = await prisma.tag.deleteMany({
      where: {
        id: params.tagId,
      },
    });

    revalidatePath(`/`);

    return NextResponse.json(tag);
  } catch (error) {
    console.log("[TAG_DELETE]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}
