import bcrypt from "bcrypt";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.log("[REGISTER ERROR]", error);
      return new NextResponse("Email already exists", { status: 400 });
    } else {
      return new NextResponse("Internal server error", { status: 500 });
    }
  } finally {
    await prisma.$disconnect();
  }
}
