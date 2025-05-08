"use client";

import { Flex, Table } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

interface Props {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  id_expiry_date: string;
}

const ExpiredTable = () => {
  const searchParams = useSearchParams();
  const [clients, setClients] = useState<Props[]>([]);
  const [totalClients, setTotalClients] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;

  useEffect(() => {
    const fetchExpiredClients = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/expired-ids?page=${currentPage}&size=${pageSize}`
        );
        if (!res.ok) throw new Error("Failed to fetch expired clients");
        const data = await res.json();
        setClients(data.clients);
        setTotalClients(data.total);
      } catch (error) {
        console.error("Expired clients fetch error:", error);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiredClients();
  }, [currentPage]);

  if (loading) return <p>Loading expired clients...</p>;

  if (clients.length === 0) {
    return <p>No IDs expired today</p>;
  }

  return (
    <Flex direction="column" gap="4">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>ID Expiry Date</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clients.map((client) => (
            <Table.Row key={client.id}>
              <Table.Cell>{client.first_name}</Table.Cell>
              <Table.Cell>{client.last_name}</Table.Cell>
              <Table.Cell>{client.email}</Table.Cell>
              <Table.Cell>
                {new Date(client.id_expiry_date).toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={totalClients}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </Flex>
  );
};

export default ExpiredTable;
