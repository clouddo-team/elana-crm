import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function GET() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const demoClientsLast30Days = await prisma.demo_client.findMany({
    where: {
      demo_validity: {
        gte: thirtyDaysAgo,
        lte: today, 
      },
    },
  });

  return NextResponse.json({ demoClientsLast30Days: demoClientsLast30Days.length });
}
