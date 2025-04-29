import React from "react";
import { prisma } from "@/lib/prisma";
import { Flex, Heading } from "@radix-ui/themes";
import ClientLogs from "./ClientLogs";

interface Props {
  params: Promise<{ id: string }>;
}

const ClientLogPage = async ({ params }: Props) => {
  const { id } = await params;
  const clientId = parseInt(id);

  const log = await prisma.clientlog.findMany({
    where: { clientId },
    orderBy: { log_created: "asc" },
  });

  return (
    <Flex direction="column" align="center" justify="center" gap="4">
      <Heading>Logs for Client {id}</Heading>
      <ClientLogs initialLogs={log} clientId={clientId} />
    </Flex>
  );
};

export default ClientLogPage;
