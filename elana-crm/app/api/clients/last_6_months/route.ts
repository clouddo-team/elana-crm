import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();

  // First day of current month
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  // First day of 5 months ago
  const startDate = new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() - 5, 1);

  // Last millisecond of current month
  const endDate = new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() + 1, 0, 23, 59, 59, 999);

  // Query all clients registered in last 6 months
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

  // Group clients by YYYY-MM
  const grouped: Record<string, number> = {};
  for (const client of clients) {
    const monthStr = client.registration_date.toISOString().slice(0, 7); // "2025-05"
    grouped[monthStr] = (grouped[monthStr] || 0) + 1;
  }

  // Build full 6-month list: ensure even months with 0 count show up
  const months: string[] = [];
  let tempDate = new Date(startDate);
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
