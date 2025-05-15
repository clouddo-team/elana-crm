"use client";

import { Button, Flex, Table } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Link from "../../components/Link";

interface ExpiredClient {
  eurosys_id: number;
  name: string;
  email: string;
  id_expiry_date: string;
  phone: string;
  country: string;
  emailedExpiredId: boolean;
}

const ExpiredTable = () => {
  const searchParams = useSearchParams();
  const [clients, setClients] = useState<ExpiredClient[]>([]);
  const [totalClients, setTotalClients] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);

  const handleSendEmails = async () => {
    setSending(true);
    setSendError(null);
    setSendSuccess(null);

    try {
      const res = await fetch("/api/mailerlite/send-email", {
        method: "POST",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send emails");
      }

      setSendSuccess("Emails sent successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) setSendError(err.message);
      else setSendError("Unknown error");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const fetchExpiredClients = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/expired-ids?page=${currentPage}&size=${pageSize}`
        );
        if (!res.ok) throw new Error("Failed to fetch expired clients");
        const data = await res.json();
        setClients(data.clients ?? []);
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
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Country</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>ID Expiry Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email Sent</Table.ColumnHeaderCell>
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
              <Table.Cell>
                {new Date(client.id_expiry_date).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>{client.emailedExpiredId ? "✔️" : ""}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={totalClients}
        pageSize={pageSize}
        currentPage={currentPage}
      />
      <Flex gap="3" align="center" justify="center" mt="4">
        <Button
          size="3"
          variant="soft"
          disabled={sending}
          onClick={handleSendEmails}
        >
          {sending ? "Sending..." : "Send Expired ID Emails"}
        </Button>

        {sendError && <p style={{ color: "red" }}>{sendError}</p>}
        {sendSuccess && <p style={{ color: "green" }}>{sendSuccess}</p>}
      </Flex>
    </Flex>
  );
};

export default ExpiredTable;
