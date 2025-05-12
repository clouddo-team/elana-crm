import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const orderBy = searchParams.get("orderBy") || "name";
  const order = searchParams.get("order") === "desc" ? "desc" : "asc";

  const skip = (page - 1) * size;
  const validOrderFields = ["name", "email", "country", "language"];
  const safeOrderBy = validOrderFields.includes(orderBy) ? orderBy : "name";
  const search = searchParams.get("search") || "";

  const whereClause = {
    ...(search && {
      OR: [
        {
          name: {
            contains: search,
          },
        },
      ],
    }),
  };

  const [clients, total] = await Promise.all([
    prisma.demo_client.findMany({
      skip,
      take: size,
      where: whereClause,
      orderBy: { [safeOrderBy]: order },
    }),
    prisma.demo_client.count(),
  ]);

  return NextResponse.json({ clients, total });
}
