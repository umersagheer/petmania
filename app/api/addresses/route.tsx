import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { addressSchema } from "@/validations/server/admin-validations";

export async function POST(req: Request) {
  const session = await getServerSession();
  try {
    const body = await req.json();

    const { address: data, addressLink } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    await addressSchema.validate(body, { abortEarly: false });

    const address = await prisma.address.create({
      data: {
        address: data,
        addressLink,
      },
    });
    revalidatePath("/");
    return NextResponse.json(address);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[Addresses_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const address = await prisma.address.findMany();
    return NextResponse.json(address);
  } catch (error) {
    console.log("[Addresses_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
