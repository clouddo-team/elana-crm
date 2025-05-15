import { prisma } from "@/lib/prisma";
import { Box, Card, Flex, Heading, Separator } from "@radix-ui/themes";
import ClientDeleteButton from "../_components/ClientDeleteButton";
import ClientEditButton from "../_components/ClientEditButton";
import ClientDeals from "./ClientDeals";

interface Props {
  params: Promise<{ id: string }>;
}

const ClientDealsPage = async ({ params }: Props) => {
  const { id } = await params;
  const clientId = parseInt(id);

  const deals = await prisma.deals.findMany({
    where: { eurosys_id: clientId },
    orderBy: { date: "desc" },
  });

  const client = await prisma.client.findUnique({
    where: { eurosys_id: clientId },
  });

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
      <ClientDeals initialDeals={deals} clientId={clientId} />
    </Box>
  );
};

export default ClientDealsPage;
