import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();

  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const startDate = new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() - 5, 1);

  const endDate = new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() + 1, 0, 23, 59, 59, 999);

  const deals = await prisma.deals.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      date: true,
    },
  });

  const grouped: Record<string, number> = {};
  for (const deal of deals) {
    const monthStr = deal.date.toISOString().slice(0, 7);
    grouped[monthStr] = (grouped[monthStr] || 0) + 1;
  }

  const months: string[] = [];
  const tempDate = new Date(startDate);
  for (let i = 0; i < 6; i++) {
    const month = tempDate.toISOString().slice(0, 7);
    months.push(month);
    tempDate.setMonth(tempDate.getMonth() + 1);
  }

  const result = months.map((month) => ({
    date: month,
    count: grouped[month] || 0,
  }));

  return NextResponse.json(result);
}
