"use client";

import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const ClientSummary = () => {
  const [realClientsMTD, setRealClientsMTD] = useState<number>(0);
  const [realClientsLast30Days, setRealClientsLast30Days] = useState<number>(0);
  const [expiredIDsLastWeek, setExpiredIDsLastWeek] = useState<number>(0);

  useEffect(() => {
    const fetchRealClientsMTD = async () => {
      const res = await fetch("/api/clients/mtd");
      const data = await res.json();
      setRealClientsMTD(data.realClientsMTD);
    };

    const fetchRealClientsLast30Days = async () => {
      const res = await fetch("/api/clients/last30days");
      const data = await res.json();
      setRealClientsLast30Days(data.realClientsLast30Days);
    };

    const fetchExpiredIDsLastWeek = async () => {
      const res = await fetch("/api/clients/expired_id_last_7_days");
      const data = await res.json();
      setExpiredIDsLastWeek(data.expiredIDsLastWeek);
    };

    fetchRealClientsMTD();
    fetchRealClientsLast30Days();
    fetchExpiredIDsLastWeek();
  }, []);

  const containers = [
    {
      label: "Real Clients Created MTD",
      value: realClientsMTD,
    },
    {
      label: "Real Clients Created Last 30 Days",
      value: realClientsLast30Days,
    },
    {
      label: "Real Clients with Expired ID Last Week",
      value: expiredIDsLastWeek,
    },
  ];

  return (
    <Flex gap="7" wrap="wrap">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link className="text-sm font-medium" href={`/clients`}>
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default ClientSummary;
