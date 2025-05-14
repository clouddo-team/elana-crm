"use client";

import { Flex, Table } from "@radix-ui/themes";
import { useState } from "react";
import ClientDeleteButton from "../_components/ClientDeleteButton";
import ClientEditButton from "../_components/ClientEditButton";
import { deal_status, deal_type } from "@prisma/client";

interface Deal {
  id: number;
  eurosys_id: number;
  date: Date;
  settlement: Date;
  status: deal_status;
  order_type: deal_type;
  code: string;
  currency: string;
  number: number;
  unit_price: number;
  total: number;
  platform: string;
}

const ClientDeals = ({
  initialDeals,
  clientId,
}: {
  initialDeals: Deal[];
  clientId: number;
}) => {
  const [deals] = useState(initialDeals);

  return (
    <Flex direction="column" gap="4" width="100%">
      {deals.length === 0 ? (
        <Flex gap="4" my="4" justify="center">
          <p>There are no deals for this client.</p>
        </Flex>
      ) : (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Code</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Platform</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Settlement</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {deals.map((deal) => (
              <Table.Row key={deal.id}>
                <Table.Cell>
                  {new Date(deal.date).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{deal.code}</Table.Cell>
                <Table.Cell>{deal.order_type}</Table.Cell>
                <Table.Cell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      deal.status === "VALIDATED"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {deal.status}
                  </span>
                </Table.Cell>
                <Table.Cell>{deal.number}</Table.Cell>
                <Table.Cell>
                  {deal.unit_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: deal.currency,
                  })}
                </Table.Cell>
                <Table.Cell>
                  {deal.total.toLocaleString("en-US", {
                    style: "currency",
                    currency: deal.currency,
                  })}
                </Table.Cell>
                <Table.Cell>{deal.platform}</Table.Cell>
                <Table.Cell>
                  {new Date(deal.settlement).toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}

      <Flex gap="4" mt="4">
        <ClientDeleteButton clientId={clientId} />
        <ClientEditButton clientId={clientId} />
      </Flex>
    </Flex>
  );
};

export default ClientDeals;
