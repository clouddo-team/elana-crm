// import React from "react";
// import { prisma } from "@/lib/prisma";
// import { Flex, Heading } from "@radix-ui/themes";
// import ClientDeals from "./ClientDeals";
// import ClientDeleteButton from "../_components/ClientDeleteButton";
// import ClientEditButton from "../_components/ClientEditButton";

// interface Props {
//   params: { id: string };
// }

// const ClientDealsPage = async ({ params }: Props) => {
//   const clientId = parseInt(params.id);

//   const deals = await prisma.deals.findMany({
//     where: { eurosys_id: clientId },
//     select: {
//       id: true,
//       eurosys_id: true,
//       date: true,
//       settlement: true,
//       status: true,
//       order_type: true,
//       code: true,
//       currency: true,
//       number: true,
//       unit_price: true,
//       total: true,
//       platform: true,
//     },
//     orderBy: { date: "desc" },
//   });

//   return (
//     <Flex direction="column" align="center" justify="center" gap="4">
//       <Heading>Deals for Client {params.id}</Heading>
//       <ClientDeleteButton clientId={clientId} />
//       <ClientEditButton clientId={clientId} />
//       <ClientDeals initialDeals={deals} clientId={clientId} />
//     </Flex>
//   );
// };

// export default ClientDealsPage;

import React from "react";
import { prisma } from "@/lib/prisma";
import {
  Flex,
  Heading,
  Card,
  Text,
  Separator,
  Box,
  Button,
} from "@radix-ui/themes";
import ClientDeals from "./ClientDeals";
import ClientDeleteButton from "../_components/ClientDeleteButton";
import ClientEditButton from "../_components/ClientEditButton";

interface Props {
  params: { id: string };
}

const ClientDealsPage = async ({ params }: Props) => {
  const clientId = parseInt(params.id);

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
