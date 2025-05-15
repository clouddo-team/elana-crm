"use client";

import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const DemoClientSummary = () => {
  const [expiredLastMonth, setExpiredLastMonth] = useState<number>(0);
  const [expiredMTD, setExpiredMTD] = useState<number>(0);

  useEffect(() => {
    const fetchExpiredLastMonth = async () => {
      const res = await fetch("/api/demo-clients/expired_last_month");
      const data = await res.json();
      setExpiredLastMonth(data.demoClientsLast30Days);
    };

    const fetchExpiredMTD = async () => {
      const res = await fetch("/api/demo-clients/expired_mtd");
      const data = await res.json();
      setExpiredMTD(data.expiredMTDCount);
    };

    fetchExpiredLastMonth();
    fetchExpiredMTD();
  }, []);

  const containers = [
    {
      label: "Demo Validity Expired Last Month",
      value: expiredLastMonth,
    },
    {
      label: "Demo Validity Expired MTD",
      value: expiredMTD,
    },
  ];

  return (
    <Flex gap="4" wrap="wrap">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link className="text-sm font-medium" href={`/demo_clients`}>
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

export default DemoClientSummary;
