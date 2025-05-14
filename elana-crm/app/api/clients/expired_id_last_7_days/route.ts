import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 
export async function GET() {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const expiredClients = await prisma.client.findMany({
      where: {
        id_expiry_date: {
          lt: today,          
          gte: sevenDaysAgo,  
        },
      },
    });

    return NextResponse.json({ expiredIDsLastWeek: expiredClients.length });
  } catch (error) {
    console.error("Error fetching expired ID clients:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
