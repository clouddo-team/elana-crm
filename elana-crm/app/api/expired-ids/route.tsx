import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const today = new Date();
  const expiredIds = await prisma.client.findMany({
    where: {
      id_expiry_date: {
        lte: today,
      },
    },
    orderBy: {
      id_expiry_date: "asc",
    },
  });

  return NextResponse.json(expiredIds);
}
