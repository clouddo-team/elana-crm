"use client";

import { useState } from "react";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";
import ClientDeleteButton from "../_components/ClientDeleteButton";
import ClientEditButton from "../_components/ClientEditButton";

interface Deal {
  eurosys_id: number;
  date: Date;
  settlement: string;
  status: string;
  order_type: string;
  code: string;
  currency: string;
  number: number;
  unit_price: number;
  total: number;
  platform: string;
}

const ClientDeals = ({
  initialLogs,
  clientId,
}: {
  initialLogs: Deal[];
  clientId: number;
}) => {
  const [deals, setDeals] = useState(initialLogs);
  const [newMessage, setNewMessage] = useState("");

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/logs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setDeals((prev) => prev.filter((deal) => deal.eurosys_id !== id));
    } else {
      alert("Failed to delete log.");
    }
  };

  const handleAdd = async () => {
    const res = await fetch("/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        log_message: newMessage,
      }),
    });

    if (res.ok) {
      const newDeal = await res.json();
      setDeals((prev) => [...prev, newDeal]);
      setNewMessage("");
    } else {
      alert("Failed to add log.");
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      width={{ initial: "100%", sm: "100%", md: "500px" }}
    >
      <Flex direction="column" gap="6" my="4" mt="4" maxWidth="100%">
        <TextField.Root
          placeholder="New log message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={handleAdd} disabled={!newMessage.trim()}>
          Add Log
        </Button>
      </Flex>

      {deals.length === 0 ? (
        <Flex gap="4" my="4">
          <Card>There are no logs for the selected user.</Card>
        </Flex>
      ) : (
        <ul>
          {deals.map((deal) => (
            <Flex gap="4" my="4" key={deal.eurosys_id} align="center">
              <li>
                <Card>
                  {deal.order_type}
                  <p>Created at {new Date(deal.date).toLocaleString()}</p>
                  <Button
                    mt="2"
                    color="red"
                    onClick={() => handleDelete(deal.eurosys_id)}
                  >
                    Delete
                  </Button>
                </Card>
              </li>
            </Flex>
          ))}
        </ul>
      )}
      <ClientDeleteButton clientId={clientId} />
      <ClientEditButton clientId={clientId} />
    </Flex>
  );
};

export default ClientDeals;
