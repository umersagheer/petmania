import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { numberSchema } from "@/validations/server/admin-validations";

export async function POST(req: Request) {
  const session = await getServerSession();
  try {
    const body = await req.json();

    const { number: phone, isWhatsapp } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    await numberSchema.validate(body, { abortEarly: false });

    const number = await prisma.number.create({
      data: {
        number: phone,
        isWhatsapp,
      },
    });
    revalidatePath("/");
    return NextResponse.json(number);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[NUMBERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const number = await prisma.number.findMany();
    return NextResponse.json(number);
  } catch (error) {
    console.log("[NUMBERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
