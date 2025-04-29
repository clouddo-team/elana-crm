"use client";

import { useState } from "react";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";
import ClientDeleteButton from "../_components/ClientDeleteButton";
import ClientEditButton from "../_components/ClientEditButton";

interface Log {
  id: number;
  log_created: Date;
  log_message: string;
  clientId: number;
}

const ClientLogs = ({
  initialLogs,
  clientId,
}: {
  initialLogs: Log[];
  clientId: number;
}) => {
  const [logs, setLogs] = useState(initialLogs);
  const [newMessage, setNewMessage] = useState("");

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/logs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setLogs((prev) => prev.filter((log) => log.id !== id));
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
      const newLog = await res.json();
      setLogs((prev) => [...prev, newLog]);
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

      {logs.length === 0 ? (
        <Flex gap="4" my="4">
          <Card>There are no logs for the selected user.</Card>
        </Flex>
      ) : (
        <ul>
          {logs.map((log) => (
            <Flex gap="4" my="4" key={log.id} align="center">
              <li>
                <Card>
                  {log.log_message}
                  <p>Created at {new Date(log.log_created).toLocaleString()}</p>
                  <Button
                    mt="2"
                    color="red"
                    onClick={() => handleDelete(log.id)}
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
      <ClientEditButton clientId={clientId}/>
    </Flex>
  );
};

export default ClientLogs;
