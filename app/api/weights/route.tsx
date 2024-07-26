import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { weightSchema } from "@/validations/server/admin-validations.server";

export async function POST(req: Request) {
  const session = await getServerSession();
  try {
    const body = await req.json();

    const { value, unit, price } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    await weightSchema.validate(body, { abortEarly: false });

    const weight = await prisma.weight.create({
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

    console.log("[WEIGHTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const weight = await prisma.weight.findMany();
    return NextResponse.json(weight);
  } catch (error) {
    console.log("[WEIGHTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
