import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [total, egt, bgt, f359] = await Promise.all([
    prisma.demo_client.count(),
    prisma.demo_client.count({ where: { is_egt: true } }),
    prisma.demo_client.count({ where: { is_bgt: true } }),
    prisma.demo_client.count({ where: { is_f359: true } }),
  ]);

  return NextResponse.json({
    total,
    egt,
    bgt,
    f359,
  });
}
