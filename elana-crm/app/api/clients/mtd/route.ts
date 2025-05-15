import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const realClientsMTD = await prisma.client.count({
    where: {
      registration_date: {
        gte: startOfMonth,
        lte: today,
      },
    },
  });

  return NextResponse.json({ realClientsMTD });
}
