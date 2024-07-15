import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

import { prisma } from "@/libs/prisma";
import { aboutSchema } from "@/validations/server/admin-validations";

export async function GET(
  req: Request,
  { params }: { params: { aboutId: string } }
) {
  try {
    if (!params.aboutId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    const about = await prisma.about.findUnique({
      where: {
        id: params.aboutId,
      },
    });

    return NextResponse.json(about);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { aboutId: string } }
) {
  try {
    const session = getServerSession();
    const body = await req.json();
    const {
      aboutDescription,
      visionDescription,
      goal,
      contactDescription,
      contactImg,
      aboutImg,
      descriptionImg,
      aboutHeroImg,
    } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    await aboutSchema.validate(body);
    if (!params.aboutId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    const about = await prisma.about.updateMany({
      where: {
        id: params.aboutId,
      },
      data: {
        aboutDescription,
        visionDescription,
        goal,
        contactDescription,
        contactImg,
        aboutImg,
        descriptionImg,
        aboutHeroImg,
      },
    });

    revalidatePath("/");

    return NextResponse.json(about);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return new NextResponse(JSON.stringify({ errors }), { status: 400 });
    }

    console.log("[ABOUT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { aboutId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.aboutId) {
      return new NextResponse("About ID is required", { status: 400 });
    }

    const about = await prisma.about.deleteMany({
      where: {
        id: params.aboutId,
      },
    });

    revalidatePath(`/`);

    return NextResponse.json(about);
  } catch (error) {
    console.log("[ABOUT_DELETE]", error);
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}
