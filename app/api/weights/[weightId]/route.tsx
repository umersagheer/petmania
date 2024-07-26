import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { weightSchema } from "@/validations/server/admin-validations.server";

export async function GET(
  req: Request,
  { params }: { params: { weightId: string } }
) {
  try {
    if (!params.weightId) {
      return new NextResponse("weight ID is required", { status: 400 });
    }

    const weight = await prisma.weight.findUnique({
      where: {
        id: params.weightId,
      },
    });

    return NextResponse.json(weight);
  } catch (error) {
    console.log("[WEIGHT_GET]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { weightId: string } }
) {
  try {
    const session = getServerSession();
    const body = await req.json();
    const { value, unit, price } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    await weightSchema.validate(body, { abortEarly: false });

    if (!params.weightId) {
      return new NextResponse("Weight ID is required", { status: 400 });
    }

    const weight = await prisma.weight.updateMany({
      where: {
        id: params.weightId,
      },
      data: {
        value,
        unit,
        price,
      },
    });

    revalidatePath("/");

    return NextResponse.json(weight);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[WEIGHT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { weightId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.weightId) {
      return new NextResponse("weight ID is required", { status: 400 });
    }

    const weight = await prisma.weight.deleteMany({
      where: {
        id: params.weightId,
      },
    });

    revalidatePath(`/`);

    return NextResponse.json(weight);
  } catch (error) {
    console.log("[WEIGHT_DELETE]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}
