import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
import ClientFormSkeleton from "../../_components/ClientFormSkeleton";
import { SiteHeader } from "@/components/site-header";
const ClientForm = dynamic(() => import("../../_components/ClientEditForm"), {
  loading: () => <ClientFormSkeleton />,
});

interface Props {
  params: Promise<{ id: string }>;
}

const EditClientPage = async ({ params }: Props) => {
  const { id } = await params;
  const clientId = parseInt(id);

  const client = await prisma.client.findUnique({
    where: { eurosys_id: clientId },
  });

  const breadcrumbItems = [
    { label: "Customers", href: "/clients" },
    {
      label: client?.name || `Client ${clientId}`,
      href: `/clients/${clientId}`,
    },
    { label: "Edit Client" },
  ];

  if (!client) notFound();

  return (
    <SiteHeader breadcrumbItems={breadcrumbItems}>
      <ClientForm client={client} />
    </SiteHeader>
  );
};

export default EditClientPage;
