import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clientSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = clientSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newClient = await prisma.client.create({
    data: {
      name: validation.data.name,
      counterpart_name: validation.data.counterpart_name,
      counterpart_id: validation.data.counterpart_id,
      risk_profile: validation.data.risk_profile,
      status: validation.data.status,
      type: validation.data.type as "individual" | "business",
      phone: validation.data.phone,
      country: validation.data.country,
      address: validation.data.address,
      email: validation.data.email,
      ic_city: validation.data.ic_city,
      registration_date: validation.data.registration_date,
      language: validation.data.language,
      representative: validation.data.representative,
      pro_retail: validation.data.pro_retail,
      comment: validation.data.comment,
    },
  });

  return NextResponse.json(newClient, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const status = searchParams.get("status") || "all";
  const orderBy = searchParams.get("orderBy") || "registration_date";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * size;

  const validOrderFields = [
    "name",
    "counterpart_name",
    "counterpart_id",
    "risk_profile",
    "status",
    "type",
    "phone",
    "country",
    "address",
    "email",
    "ic_city",
    "registration_date",
    "language",
    "representative",
    "pro_retail",
    "updatedAt",
  ];
  const safeOrderBy = validOrderFields.includes(orderBy)
    ? orderBy
    : "registration_date";

  const statusMap = {
    active: "ACTIVE",
    inactive: "INACTIVE",
  } as const;

  const normalizedStatus =
    status !== "all"
      ? statusMap[status.toLowerCase() as keyof typeof statusMap]
      : undefined;

  const whereClause = {
    ...(normalizedStatus && {
      status: normalizedStatus,
    }),
    ...(search && {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          counterpart_name: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
        {
          country: {
            contains: search,
          },
        },
        {
          address: {
            contains: search,
          },
        },
      ],
    }),
  };

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      skip,
      take: size,
      where: whereClause,
      orderBy: { [safeOrderBy]: order },
    }),
    prisma.client.count({
      where: whereClause,
    }),
  ]);

  return NextResponse.json({ clients, total });
}
