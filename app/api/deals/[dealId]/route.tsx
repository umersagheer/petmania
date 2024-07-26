import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { dealSchema } from "@/validations/server/admin-validations.server";

export async function GET(
  req: Request,
  { params }: { params: { dealId: string } }
) {
  try {
    if (!params.dealId) {
      return new NextResponse("deal ID is required", { status: 400 });
    }

    const deal = await prisma.deal.findUnique({
      where: {
        id: params.dealId,
      },
    });

    return NextResponse.json(deal);
  } catch (error) {
    console.log("[DEAL_GET]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { dealId: string } }
) {
  try {
    const session = getServerSession();
    const body = await req.json();
    const { name } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    await dealSchema.validate(body, { abortEarly: false });

    if (!params.dealId) {
      return new NextResponse("NUmber ID is required", { status: 400 });
    }

    const deal = await prisma.deal.updateMany({
      where: {
        id: params.dealId,
      },
      data: {
        name,
      },
    });

    revalidatePath("/");

    return NextResponse.json(deal);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[DEAL_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { dealId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.dealId) {
      return new NextResponse("deal ID is required", { status: 400 });
    }

    const deal = await prisma.deal.deleteMany({
      where: {
        id: params.dealId,
      },
    });

    revalidatePath(`/`);

    return NextResponse.json(deal);
  } catch (error) {
    console.log("[DEAL_DELETE]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}
