import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendExpiredIdEmail } from "@/lib/mailerLite";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const skip = (page - 1) * size;

  const today = new Date();

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where: {
        id_expiry_date: {
          lte: today,
        },
      },
      orderBy: {
        id_expiry_date: "asc",
      },
      skip,
      take: size,
    }),
    prisma.client.count({
      where: {
        id_expiry_date: {
          lte: today,
        },
      },
    }),
  ]);

  // Send emails to all clients with expired IDs
  const emailResults = await Promise.allSettled(
    clients.map((client) => sendExpiredIdEmail(client))
  );

  // Log any email sending failures
  emailResults.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(
        `Failed to send email to ${clients[index].email}:`,
        result.reason
      );
    }
  });

  return NextResponse.json({ clients, total, emailResults });
}
