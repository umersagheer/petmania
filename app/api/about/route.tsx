import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { prisma } from "@/libs/prisma";
import * as yup from "yup";
import { revalidatePath } from "next/cache";
import { aboutSchema } from "@/validations/server/admin-validations.server";

export async function POST(req: Request) {
  const session = await getServerSession();
  try {
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
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    await aboutSchema.validate(body, { abortEarly: false });

    const about = await prisma.about.create({
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

export async function GET(req: Request) {
  try {
    const about = await prisma.about.findMany();
    return NextResponse.json(about);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
