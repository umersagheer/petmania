import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { numberSchema } from "@/validations/server/admin-validations.server";

export async function GET(
  req: Request,
  { params }: { params: { numberId: string } }
) {
  try {
    if (!params.numberId) {
      return new NextResponse("numberId ID is required", { status: 400 });
    }

    const number = await prisma.number.findUnique({
      where: {
        id: params.numberId,
      },
    });

    return NextResponse.json(number);
  } catch (error) {
    console.log("[NUMBER_GET]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { numberId: string } }
) {
  try {
    const session = getServerSession();
    const body = await req.json();
    const { number: phone, isWhatsapp } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    await numberSchema.validate(body, { abortEarly: false });

    if (!params.numberId) {
      return new NextResponse("NUmber ID is required", { status: 400 });
    }

    const number = await prisma.number.updateMany({
      where: {
        id: params.numberId,
      },
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

    console.log("[NUMBERS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { numberId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.numberId) {
      return new NextResponse("number ID is required", { status: 400 });
    }

    const number = await prisma.number.deleteMany({
      where: {
        id: params.numberId,
      },
    });

    revalidatePath(`/`);

    return NextResponse.json(number);
  } catch (error) {
    console.log("[NUMBER_DELETE]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}
