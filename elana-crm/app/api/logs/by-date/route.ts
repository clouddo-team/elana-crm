import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  startDate.setHours(0, 0, 0, 0);

  const deals = await prisma.deals.findMany({
    where: {
      date: {
        gte: startDate,
      },
    },
    select: {
      date: true,
    },
  });

  const grouped: Record<string, number> = {};
  for (const deal of deals) {
    const dateStr = deal.date.toISOString().split("T")[0];
    grouped[dateStr] = (grouped[dateStr] || 0) + 1;
  }


  const result = Object.entries(grouped).map(([date, count]) => ({
    date,
    count,
  }));

  return NextResponse.json(result);
}
