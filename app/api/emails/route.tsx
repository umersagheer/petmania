import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { emailSchema } from "@/validations/server/admin-validations.server";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const session = await getServerSession();
  try {
    const body = await req.json();

    const { email: data } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    await emailSchema.validate(body, { abortEarly: false });

    const email = await prisma.email.create({
      data: {
        email: data,
      },
    });
    revalidatePath("/");
    return NextResponse.json(email);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return new NextResponse("Email already exists", { status: 400 });
    } else if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[EMAILS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const email = await prisma.email.findMany();
    return NextResponse.json(email);
  } catch (error) {
    console.log("[EMAILS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
