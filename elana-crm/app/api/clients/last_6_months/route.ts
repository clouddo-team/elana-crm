import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();

  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const startDate = new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() - 5, 1);

  const endDate = new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() + 1, 0, 23, 59, 59, 999);

  const clients = await prisma.client.findMany({
    where: {
      registration_date: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      registration_date: true,
    },
  });

  const grouped: Record<string, number> = {};
  for (const client of clients) {
    const monthStr = client.registration_date.toISOString().slice(0, 7); 
    grouped[monthStr] = (grouped[monthStr] || 0) + 1;
  }


  const months: string[] = [];
  const tempDate = new Date(startDate);
  for (let i = 0; i < 6; i++) {
    months.push(tempDate.toISOString().slice(0, 7));
    tempDate.setMonth(tempDate.getMonth() + 1);
  }

  const result = months.map((month) => ({
    date: month,
    count: grouped[month] || 0,
  }));

  return NextResponse.json(result);
}
