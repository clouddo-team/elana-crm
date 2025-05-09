"use client";

import { Flex, Table } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

interface DemoClient {
  id: number;
  email: string;
  name: string;
  phone: string;
  gdpr: boolean;
  demo_validity: string;
  country: string;
  city: string;
  language: string;
  is_egt: boolean;
  is_bgt: boolean;
  is_f359: boolean;
}

const DemoClientTable = () => {
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const orderBy = searchParams.get("orderBy") || "name";
  const order = searchParams.get("order") || "asc";
  const [demoClients, setDemoClients] = useState<DemoClient[]>([]);
  const [totalClients, setTotalClients] = useState(0);

  const toggleSort = (field: string) => {
    const newOrder = orderBy === field && order === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderBy", field);
    params.set("order", newOrder);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/demo-clients?page=${currentPage}&size=${pageSize}&orderBy=${orderBy}&order=${order}`
        );
        if (!res.ok) throw new Error("Failed to fetch demo clients");
        const data = await res.json();
        setDemoClients(data.clients);
        setTotalClients(data.total);
      } catch (err) {
        console.error(err);
        setDemoClients([]);
      }
    };
    fetchData();
  }, [currentPage, orderBy, order]);

  return (
    <Flex direction="column" gap="4">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell
              onClick={() => toggleSort("name")}
              style={{ cursor: "pointer" }}
            >
              Name {orderBy === "name" && (order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Country</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>City</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Language</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>EGT</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>BGT</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>F359</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {demoClients.map((client) => (
            <Table.Row key={client.id}>
              <Table.Cell>{client.name}</Table.Cell>
              <Table.Cell>{client.email}</Table.Cell>
              <Table.Cell>{client.phone}</Table.Cell>
              <Table.Cell>{client.country}</Table.Cell>
              <Table.Cell>{client.city}</Table.Cell>
              <Table.Cell>{client.language}</Table.Cell>
              <Table.Cell>{client.is_egt ? "Yes" : "No"}</Table.Cell>
              <Table.Cell>{client.is_bgt ? "Yes" : "No"}</Table.Cell>
              <Table.Cell>{client.is_f359 ? "Yes" : "No"}</Table.Cell>
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

export default DemoClientTable;
