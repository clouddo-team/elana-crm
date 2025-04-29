"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Table, Flex } from "@radix-ui/themes";
import Link from "../components/Link";
import ClientStatusBadge from "../components/ClientStatusBadge";
import Pagination from "../components/Pagination";
import { client_status } from "@prisma/client";
interface Client {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
  status: client_status;
}

const ClientTable = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const statusFilter = searchParams.get("status") || "all";
  const [clients, setClients] = useState<Client[]>([]);
  const [totalClients, setTotalClients] = useState(0);
  const orderBy = searchParams.get("orderBy") || "date_joined";
  const order = searchParams.get("order") || "asc";
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const router = useRouter();

  const toggleSort = (field: string) => {
    const newOrder = orderBy === field && order === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderBy", field);
    params.set("order", newOrder);
    if (!params.get("status")) params.set("status", "all");
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(
          `/api/clients?page=${currentPage}&size=${pageSize}&status=${statusFilter}&orderBy=${orderBy}&order=${order}&search=${searchTerm}`
        );
        if (!res.ok) throw new Error("Failed to fetch clients");
        const data = await res.json();
        setClients(data.clients);
        setTotalClients(data.total);
      } catch (error) {
        console.error("Client fetch error:", error);
        setClients([]);
      }
    };
    fetchClients();
  }, [currentPage, statusFilter, orderBy, order, searchTerm]);

  return (
    <Flex direction="column" gap="4">
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border rounded-md mb-4 max-w-xs"
      />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell
              onClick={() => toggleSort("first_name")}
              style={{ cursor: "pointer" }}
            >
              First Name{" "}
              {orderBy === "first_name" && (order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell
              onClick={() => toggleSort("last_name")}
              style={{ cursor: "pointer" }}
            >
              Last Name{" "}
              {orderBy === "last_name" && (order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Email
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Date Joined
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clients.map((client) => (
            <Table.Row key={client.id}>
              <Table.Cell>
                <Link href={`/clients/${client.id}`}>{client.first_name}</Link>
              </Table.Cell>
              <Table.Cell>
                <Link href={`/clients/${client.id}`}>{client.last_name}</Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {client.email}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {new Date(client.date_joined).toDateString()}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <ClientStatusBadge status={client.status} />
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

export default ClientTable;
