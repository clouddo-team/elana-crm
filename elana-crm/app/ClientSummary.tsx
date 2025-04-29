import { client_status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  active: number;
  inactive: number;
  pending_payment: number;
}

const ClientSummary = ({ active, inactive, pending_payment }: Props) => {
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
    {
      label: "Pending Payment",
      value: pending_payment,
      status: "PENDING_PAYMENT",
    },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/clients/list?status=${container.status}`}
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
