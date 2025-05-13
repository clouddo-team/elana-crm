import { client_status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  active: number;
  inactive: number;
}

const ClientSummary = ({ active, inactive }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: client_status;
  }[] = [
    { label: "Active Clients", value: active, status: "ACTIVE" },
    {
      label: "Inactive Clients",
      value: inactive,
      status: "INACTIVE",
    },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/clients/?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default ClientSummary;
