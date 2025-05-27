"use client";

import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";

const AddLogForm = ({ eurosys_id }: { eurosys_id: number }) => {
  const [logText, setLogText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const res = await fetch("/api/log-entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eurosys_id, log: logText }),
    });

    setLoading(false);
    if (res.ok) {
      setLogText("");
      setSuccess(true);
      window.location.reload();
    } else {
      alert("Failed to add communication.");
    }
  };

  return (
    <Flex direction="column" gap="4">
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <textarea
          value={logText}
          onChange={(e) => setLogText(e.target.value)}
          placeholder="Enter New Communication..."
          required
          rows={3}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        />
        <Button
          type="submit"
          disabled={loading}
          variant="soft"
          color="blue"
          size="3"
        >
          {loading ? "Adding..." : "Add Communication"}
        </Button>
        {success && (
          <p style={{ color: "green", marginTop: "6px" }}>
            Communication added successfully!
          </p>
        )}
      </form>
    </Flex>
  );
};

export default AddLogForm;
