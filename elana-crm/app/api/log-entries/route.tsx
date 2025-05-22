import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { eurosys_id, log } = body;

  if (!log || !eurosys_id) {
    return NextResponse.json(
      { error: "Missing log or eurosys_id" },
      { status: 400 }
    );
  }

  const newLog = await prisma.log.create({
    data: {
      log,
      eurosys_id,
      date: new Date(),
    },
  });

  return NextResponse.json(newLog);
}
