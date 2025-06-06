import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const skip = (page - 1) * size;

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where: {
        id_expiry_date: {
          lte: today,
        },
      },
      select: {
        eurosys_id: true,
        name: true,
        email: true,
        phone: true,
        country: true,
        id_expiry_date: true,
        emailedExpiredId: true,
      },
      orderBy: {
        id_expiry_date: "asc",
      },
      skip,
      take: size,
    }),
    prisma.client.count({
      where: {
        id_expiry_date: {
          lte: today,
        },
      },
    }),
  ]);

  return NextResponse.json({ clients, total });
}
