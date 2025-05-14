import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust the path to your prisma client

export async function GET() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30); // Subtract 30 days from today

  const realClientsLast30Days = await prisma.client.findMany({
    where: {
      registration_date: {
        gte: thirtyDaysAgo,
        lte: today, 
      },
    },
  });

  return NextResponse.json({ realClientsLast30Days: realClientsLast30Days.length });
}
