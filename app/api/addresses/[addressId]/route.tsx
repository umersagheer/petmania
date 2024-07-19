import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { addressSchema } from "@/validations/server/admin-validations";

export async function GET(
  req: Request,
  { params }: { params: { addressId: string } }
) {
  try {
    if (!params.addressId) {
      return new NextResponse("address ID is required", { status: 400 });
    }

    const address = await prisma.address.findUnique({
      where: {
        id: params.addressId,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_GET]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { addressId: string } }
) {
  try {
    const session = getServerSession();
    const body = await req.json();
    const { address: data, addressLink } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    await addressSchema.validate(body, { abortEarly: false });

    if (!params.addressId) {
      return new NextResponse("address ID is required", { status: 400 });
    }

    const address = await prisma.address.updateMany({
      where: {
        id: params.addressId,
      },
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

    console.log("[ADDRESS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { addressId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.addressId) {
      return new NextResponse("address ID is required", { status: 400 });
    }

    const address = await prisma.address.deleteMany({
      where: {
        id: params.addressId,
      },
    });

    revalidatePath(`/`);

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_DELETE]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}
