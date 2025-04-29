import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { clientId, log_message } = body;

  if (!clientId || !log_message) {
    return new Response("Missing required fields", { status: 400 });
  }

  const newLog = await prisma.clientlog.create({
    data: {
      clientId: parseInt(clientId),
      log_message,
    },
  });

  return NextResponse.json(newLog);
}
