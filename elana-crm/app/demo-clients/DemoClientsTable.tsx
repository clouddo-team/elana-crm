"use client";

import { Flex, Table } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";

interface DemoClient {
  id: number;
  email: string;
  name: string;
  phone: string;
  gdpr: boolean;
  demo_validity: Date;
  country: string;
  city: string;
  language: string;
  is_egt: boolean;
  is_bgt: boolean;
  is_f359: boolean;
}

interface DemoClientTableProps {
  visibleColumns: string[];
}

const DemoClientTable = ({ visibleColumns }: DemoClientTableProps) => {
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const orderBy = searchParams.get("orderBy") || "name";
  const order = searchParams.get("order") || "asc";
  const [demoClients, setDemoClients] = useState<DemoClient[]>([]);
  const [totalClients, setTotalClients] = useState(0);
  const searchTerm = searchParams.get("search") || "";
  const egtFilter = searchParams.get("egt") ?? "all";
  const bgtFilter = searchParams.get("bgt") ?? "all";
  const f359Filter = searchParams.get("f359") ?? "all";

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
          `/api/demo-clients?page=${currentPage}&size=${pageSize}&orderBy=${orderBy}&order=${order}&search=${searchTerm}&egt=${egtFilter}&bgt=${bgtFilter}&f359=${f359Filter}`
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
  }, [
    currentPage,
    orderBy,
    order,
    searchTerm,
    egtFilter,
    bgtFilter,
    f359Filter,
  ]);

  const shouldShow = (col: string) => visibleColumns.includes(col);

  return (
    <Flex direction="column" gap="4">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {shouldShow("name") && (
              <Table.ColumnHeaderCell
                onClick={() => toggleSort("name")}
                style={{ cursor: "pointer" }}
              >
                Name {orderBy === "name" && (order === "asc" ? "↑" : "↓")}
              </Table.ColumnHeaderCell>
            )}
            {shouldShow("email") && (
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            )}
            {shouldShow("phone") && (
              <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
            )}
            {shouldShow("country") && (
              <Table.ColumnHeaderCell>Country</Table.ColumnHeaderCell>
            )}
            {shouldShow("demo_validity") && (
              <Table.ColumnHeaderCell>Validity</Table.ColumnHeaderCell>
            )}
            {shouldShow("city") && (
              <Table.ColumnHeaderCell>City</Table.ColumnHeaderCell>
            )}
            {shouldShow("language") && (
              <Table.ColumnHeaderCell>Language</Table.ColumnHeaderCell>
            )}
            {shouldShow("is_egt") && (
              <Table.ColumnHeaderCell>Platform 1</Table.ColumnHeaderCell>
            )}
            {shouldShow("is_bgt") && (
              <Table.ColumnHeaderCell>Platform 2</Table.ColumnHeaderCell>
            )}
            {shouldShow("is_f359") && (
              <Table.ColumnHeaderCell>Platform 3</Table.ColumnHeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {demoClients.map((client) => (
            <Table.Row key={client.id}>
              {shouldShow("name") && <Table.Cell>{client.name}</Table.Cell>}
              {shouldShow("email") && <Table.Cell>{client.email}</Table.Cell>}
              {shouldShow("phone") && <Table.Cell>{client.phone}</Table.Cell>}
              {shouldShow("country") && (
                <Table.Cell>{client.country}</Table.Cell>
              )}
              {shouldShow("demo_validity") && (
                <Table.Cell>
                  {new Date(client.demo_validity).toDateString()}
                </Table.Cell>
              )}
              {shouldShow("city") && <Table.Cell>{client.city}</Table.Cell>}
              {shouldShow("language") && (
                <Table.Cell>{client.language}</Table.Cell>
              )}
              {shouldShow("is_egt") && (
                <Table.Cell>{client.is_egt ? "Yes" : "No"}</Table.Cell>
              )}
              {shouldShow("is_bgt") && (
                <Table.Cell>{client.is_bgt ? "Yes" : "No"}</Table.Cell>
              )}
              {shouldShow("is_f359") && (
                <Table.Cell>{client.is_f359 ? "Yes" : "No"}</Table.Cell>
              )}
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
