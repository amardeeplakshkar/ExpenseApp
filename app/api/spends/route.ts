import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Schema for spend validation
const SpendSchema = z.object({
  userId: z.string(),
  name: z.string().min(1),
  icon: z.string(),
  date: z.string(),
  time: z.string(),
  amount: z.number().positive(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = SpendSchema.parse(body);

    const spend = await prisma.spend.create({
      data: validatedData,
    });

    return NextResponse.json(spend);
  } catch (error) {
    console.error("[SPENDS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    
    if (!userId) {
      return new NextResponse("UserId is required", { status: 400 });
    }

    const spends = await prisma.spend.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(spends);
  } catch (error) {
    console.error("[SPENDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}