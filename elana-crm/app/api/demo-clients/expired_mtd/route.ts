import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const today = new Date();
  const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const expiredMTDCount = await prisma.demo_client.count({
    where: {
      demo_validity: {
        gte: firstDayThisMonth,
        lte: today,
      },
    },
  });

  return NextResponse.json({ expiredMTDCount });
}
