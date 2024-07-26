import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { dealSchema } from "@/validations/server/admin-validations.server";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const session = await getServerSession();
  try {
    const body = await req.json();

    const { name } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    await dealSchema.validate(body, { abortEarly: false });

    const deal = await prisma.deal.create({
      data: {
        name,
      },
    });
    revalidatePath("/");
    return NextResponse.json(deal);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return new NextResponse("Deal already exists", { status: 400 });
    } else if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[DEALS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const deal = await prisma.deal.findMany();
    return NextResponse.json(deal);
  } catch (error) {
    console.log("[DEALS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
