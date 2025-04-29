// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { createClientSchema } from "../../validationSchemas";

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const validation = createClientSchema.safeParse(body);
//   if (!validation.success)
//     return NextResponse.json(validation.error.errors, { status: 400 });

//   const newClient = await prisma.client.create({
//     data: {
//       first_name: validation.data.first_name,
//       last_name: validation.data.last_name,
//       email: validation.data.email,
//     },
//   });
//   return NextResponse.json(newClient, { status: 201 });
// }

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const page = parseInt(searchParams.get("page") || "1");
//   const size = parseInt(searchParams.get("size") || "10");
//   const status = searchParams.get("status") || "all";
//   const orderBy = searchParams.get("orderBy") || "date_joined";
//   const order = searchParams.get("order") === "asc" ? "asc" : "desc";
//   const search = searchParams.get("search") || "";
//   const skip = (page - 1) * size;

//   const validOrderFields = ["first_name", "last_name", "date_joined", "email"];
//   const safeOrderBy = validOrderFields.includes(orderBy)
//     ? orderBy
//     : "date_joined";

//   const statusMap = {
//     active: "ACTIVE",
//     inactive: "INACTIVE",
//     pending_payment: "PENDING_PAYMENT",
//   } as const;

//   const normalizedStatus =
//     status !== "all"
//       ? statusMap[status.toLowerCase() as keyof typeof statusMap]
//       : undefined;

//   const whereClause = {
//     ...(normalizedStatus && {
//       status: normalizedStatus,
//     }),
//     ...(search && {
//       first_name: {
//         contains: search,
//       } as any,
//     }),
//   };

//   const [clients, total] = await Promise.all([
//     prisma.client.findMany({
//       skip,
//       take: size,
//       where: whereClause,
//       orderBy: { [safeOrderBy]: order },
//     }),
//     prisma.client.count({
//       where: whereClause,
//     }),
//   ]);

//   return NextResponse.json({ clients, total });
// }

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
      first_name: validation.data.first_name,
      last_name: validation.data.last_name,
      email: validation.data.email,
    },
  });

  return NextResponse.json(newClient, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const status = searchParams.get("status") || "all";
  const orderBy = searchParams.get("orderBy") || "date_joined";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * size;

  const validOrderFields = ["first_name", "last_name", "date_joined", "email"];
  const safeOrderBy = validOrderFields.includes(orderBy)
    ? orderBy
    : "date_joined";

  const statusMap = {
    active: "ACTIVE",
    inactive: "INACTIVE",
    pending_payment: "PENDING_PAYMENT",
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
          first_name: {
            contains: search,
          },
        },
        {
          last_name: {
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
