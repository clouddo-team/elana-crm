import { prisma } from "@/lib/prisma";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";

import Link from "next/link";
import ClientStatusBadge from "../components/ClientStatusBadge";

const LatestIssues = async () => {
  const clients = await prisma.client.findMany({
    orderBy: { registration_date: "desc" },
    take: 5,
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Clients
      </Heading>
      <Table.Root>
        <Table.Body>
          {clients.map((client) => (
            <Table.Row key={client.eurosys_id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/clients/${client.eurosys_id}`}>
                      {client.name} {client.name} - joined{" "}
                      {client.registration_date.toLocaleDateString()}
                    </Link>
                    <ClientStatusBadge status={client.status} />
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
