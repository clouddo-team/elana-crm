import { prisma } from "@/lib/prisma";
import { Box, Card, Flex, Heading, Separator } from "@radix-ui/themes";
import ClientDeleteButton from "../_components/ClientDeleteButton";
import ClientEditButton from "../_components/ClientEditButton";
import ClientDeals from "./ClientDeals";
import ClientLogs from "./ClientLogs";
import AddLogForm from "./_components/AddLogForm";

interface Props {
  params: Promise<{ id: string }>;
}

const ClientDealsPage = async ({ params }: Props) => {
  const { id } = await params;
  const clientId = parseInt(id);

  const [deals, client, logs] = await Promise.all([
    prisma.deals.findMany({
      where: { eurosys_id: clientId },
      orderBy: { date: "desc" },
    }),
    prisma.client.findUnique({ where: { eurosys_id: clientId } }),
    prisma.log.findMany({
      where: { eurosys_id: clientId },
      orderBy: { date: "desc" },
    }),
  ]);

  return (
    <Box p="6" maxWidth="1000px" mx="auto">
      <Card size="3" mb="4">
        <Flex justify="between" align="center" gap="4">
          <Heading size="5">{client?.name || `Client ${clientId}`}</Heading>
          <Flex gap="3">
            <ClientEditButton clientId={clientId} />
            <ClientDeleteButton clientId={clientId} />
          </Flex>
        </Flex>

        <Separator my="4" />
      </Card>
      <Flex direction="column" gap="8">
        <ClientDeals initialDeals={deals} clientId={clientId} />
        <ClientLogs logs={logs} />
        <AddLogForm eurosys_id={clientId} />
      </Flex>
    </Box>
  );
};

export default ClientDealsPage;
