// import authOptions from "@/app/auth/authOptions";
// import { clientSchema } from "@/app/validationSchemas";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";

// interface Props
// {
//     params : {id: string}
// }

// export async function PATCH(reuqest: NextRequest, {params}: Props)
// {
//     const session = await getServerSession(authOptions)
//     if(!session) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

//     const body = await reuqest.json();
//     const validation = clientSchema.safeParse(body);

//     if(!validation.success) return NextResponse.json(validation.error.errors, {status: 400});

//     const { first_name, last_name, email, status } = body;

//     const clientId = await parseInt(params.id);
//     const client  = await prisma.client.findUnique({where:{id:clientId}});
    
//     if(!client) return NextResponse.json({error: 'Client not found'}, {status: 404});

//     const updatedClient = await prisma.client.update({where:{id:clientId}, data:{first_name, last_name, email, status}});
//     return NextResponse.json(updatedClient);
// }

// export async function DELETE(reuqest: NextRequest, {params}: Props)
// {
//     const session = await getServerSession(authOptions)
//     if(!session) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

//     const clientId = await parseInt(params.id);
//     const client  = await prisma.client.findUnique({where:{id:clientId}});
    
//     if(!client) return NextResponse.json({error: 'Client not found'}, {status: 404});

//     await prisma.client.delete({where:{id:clientId}});
//     return NextResponse.json({success: true});
// }

import authOptions from "@/app/auth/authOptions";
import { clientSchema } from "@/app/validationSchemas";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const validation = clientSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { first_name, last_name, email, status } = body;
  const params = await context.params;
  const clientId = parseInt(params.id);
  const client = await prisma.client.findUnique({ where: { id: clientId } });

  if (!client)
    return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const updatedClient = await prisma.client.update({
    where: { id: clientId },
    data: { first_name, last_name, email, status },
  });
  return NextResponse.json(updatedClient);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const params = await context.params;
  const clientId = parseInt(params.id);
  const client = await prisma.client.findUnique({ where: { id: clientId } });

  if (!client)
    return NextResponse.json({ error: "Client not found" }, { status: 404 });

  await prisma.client.delete({ where: { id: clientId } });
  return NextResponse.json({ success: true });
}