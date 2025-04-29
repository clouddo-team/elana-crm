import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
import ClientFormSkeleton from "../../_components/ClientFormSkeleton";
const ClientForm = dynamic(() => import("../../_components/ClientEditForm"), {
  loading: () => <ClientFormSkeleton />,
});

interface Props {
  params: Promise<{ id: string }>;
}

const EditClientPage = async ({ params }: Props) => {
  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id: parseInt(id) },
  });

  if (!client) notFound();

  return <ClientForm client={client} />;
};

export default EditClientPage;
