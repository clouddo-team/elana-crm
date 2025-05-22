"use client";

import { Flex, Table, Heading } from "@radix-ui/themes";
import { useState } from "react";

interface Log {
  id: number;
  log: string;
  date: Date;
  eurosys_id: number;
}

const ClientLogs = ({ logs }: { logs: Log[] }) => {
  const [logData] = useState<Log[]>(logs || []);

  return (
    <Flex direction="column" gap="4" width="100%">
      {logData.length === 0 ? (
        <Flex gap="4" my="4" justify="center">
          <p>There are no logs for this client.</p>
        </Flex>
      ) : (
        <Flex direction="column" gap="4">
          <Heading>Client Logs</Heading>
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Log</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {logData.map((log) => (
                <Table.Row key={log.id}>
                  <Table.Cell>
                    {new Date(log.date).toLocaleString("en-GB")}
                  </Table.Cell>
                  <Table.Cell>{log.log}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Flex>
      )}
    </Flex>
  );
};

export default ClientLogs;
