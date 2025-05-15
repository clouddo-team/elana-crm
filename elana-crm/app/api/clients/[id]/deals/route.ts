import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 
  const clientId = parseInt(id);

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const skip = (page - 1) * size;

  const [deals, total] = await Promise.all([
    prisma.deals.findMany({
      where: { eurosys_id: clientId },
      orderBy: { date: "desc" },
      skip,
      take: size,
    }),
    prisma.deals.count({
      where: { eurosys_id: clientId },
    }),
  ]);

  return NextResponse.json({ deals, total });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // await here too!
  const clientId = parseInt(id);

  const body = await request.json();

  const newDeal = await prisma.deals.create({
    data: {
      eurosys_id: clientId,
      date: new Date(),
      settlement: body.settlement,
      status: body.status,
      order_type: body.order_type,
      code: body.code,
      currency: body.currency,
      number: body.number,
      unit_price: body.unit_price,
      total: body.total,
      platform: body.platform,
    },
  });

  return NextResponse.json(newDeal, { status: 201 });
}


