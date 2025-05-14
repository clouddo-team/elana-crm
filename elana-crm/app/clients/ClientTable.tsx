"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Table, Flex } from "@radix-ui/themes";
import Link from "../../components/Link";
import ClientStatusBadge from "../../components/ClientStatusBadge";
import Pagination from "../../components/Pagination";
import { client_status } from "@prisma/client";

interface Client {
  eurosys_id: number;
  name: string;
  counterpart_name: string;
  counterpart_id: string;
  risk_profile: string;
  status: client_status;
  type: string;
  phone: string;
  country: string;
  address: string;
  email: string;
  ic_city: string;
  registration_date: string;
  language: string;
  representative: string;
  pro_retail: string;
  comment?: string;
  id_expiry_date: string;
}

const ClientTable = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const statusFilter = searchParams.get("status") || "all";
  const [clients, setClients] = useState<Client[]>([]);
  const [totalClients, setTotalClients] = useState(0);
  const orderBy = searchParams.get("orderBy") || "registration_date";
  const order = searchParams.get("order") || "asc";
  const searchTerm = searchParams.get("search") || "";

  const toggleSort = (field: string) => {
    const newOrder = orderBy === field && order === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderBy", field);
    params.set("order", newOrder);
    if (!params.get("status")) params.set("status", "all");
    window.history.pushState(null, "", `?${params.toString()}`);
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
            <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Risk Profile</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Representative</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Counterpart Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Counterpart ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>IC City</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Language</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Pro/Retail</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell
              onClick={() => toggleSort("registration_date")}
              style={{ cursor: "pointer" }}
            >
              Registration Date{" "}
              {orderBy === "registration_date" && (order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>ID Expiry</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Comment</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clients.map((client) => (
            <Table.Row key={client.eurosys_id}>
              <Table.Cell>
                <Link href={`/clients/${client.eurosys_id}`}>
                  {client.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{client.email}</Table.Cell>
              <Table.Cell>{client.phone}</Table.Cell>
              <Table.Cell>{client.country}</Table.Cell>
              <Table.Cell>{client.address}</Table.Cell>
              <Table.Cell>{client.type}</Table.Cell>
              <Table.Cell>
                <ClientStatusBadge status={client.status} />
              </Table.Cell>
              <Table.Cell>{client.risk_profile}</Table.Cell>
              <Table.Cell>{client.representative}</Table.Cell>
              <Table.Cell>{client.counterpart_name}</Table.Cell>
              <Table.Cell>{client.counterpart_id}</Table.Cell>
              <Table.Cell>{client.ic_city}</Table.Cell>
              <Table.Cell>{client.language}</Table.Cell>
              <Table.Cell>{client.pro_retail}</Table.Cell>
              <Table.Cell>
                {new Date(client.registration_date).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                {new Date(client.id_expiry_date).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>{client.comment || "-"}</Table.Cell>
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
