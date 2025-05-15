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

  const egt = searchParams.get("egt") ?? "all";
  const bgt = searchParams.get("bgt") ?? "all";
  const f359 = searchParams.get("f359") ?? "all";

  const whereClause: any = {};

  if (search) {
    whereClause.OR = [
      {
        name: {
          contains: search,
        },
      },
      {
        email: {
          contains: search,
        },
      },
    ];
  }

  if (egt !== "all") {
    whereClause.is_egt = egt === "yes";
  }

  if (bgt !== "all") {
    whereClause.is_bgt = bgt === "yes";
  }

  if (f359 !== "all") {
    whereClause.is_f359 = f359 === "yes";
  }

  const [clients, total] = await Promise.all([
    prisma.demo_client.findMany({
      skip,
      take: size,
      where: whereClause,
      orderBy: { [safeOrderBy]: order },
    }),
    prisma.demo_client.count({ where: whereClause }),
  ]);

  return NextResponse.json({ clients, total });
}
