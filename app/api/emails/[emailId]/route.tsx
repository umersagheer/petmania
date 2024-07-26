import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { emailSchema } from "@/validations/server/admin-validations.server";

export async function GET(
  req: Request,
  { params }: { params: { emailId: string } }
) {
  try {
    if (!params.emailId) {
      return new NextResponse("email ID is required", { status: 400 });
    }

    const email = await prisma.email.findUnique({
      where: {
        id: params.emailId,
      },
    });

    return NextResponse.json(email);
  } catch (error) {
    console.log("[EMAIL_GET]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { emailId: string } }
) {
  try {
    const session = getServerSession();
    const body = await req.json();
    const { email: data } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    await emailSchema.validate(body, { abortEarly: false });

    if (!params.emailId) {
      return new NextResponse("NUmber ID is required", { status: 400 });
    }

    const email = await prisma.email.updateMany({
      where: {
        id: params.emailId,
      },
      data: {
        email: data,
      },
    });

    revalidatePath("/");

    return NextResponse.json(email);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[EMAIL_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { emailId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.emailId) {
      return new NextResponse("email ID is required", { status: 400 });
    }

    const email = await prisma.email.deleteMany({
      where: {
        id: params.emailId,
      },
    });

    revalidatePath(`/`);

    return NextResponse.json(email);
  } catch (error) {
    console.log("[EMAIL_DELETE]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}
