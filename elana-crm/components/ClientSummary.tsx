"use client";
import { useEffect, useState } from "react";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";

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
      icon: <TrendingUp />,
      description: "Trending up this month",
      clarification: "Visitors for the last 6 months",
      percentage: 0,
      href: "/clients",
    },
    {
      label: "Real Clients Created Last 30 Days",
      value: realClientsLast30Days,
      icon: <TrendingUp />,
      description: "Trending up this month",
      clarification: "Visitors for the last 6 months",
      percentage: 12.5,
      href: "/clients",
    },
    {
      label: "Real Clients with Expired ID Last Week",
      value: expiredIDsLastWeek,
      icon: <TrendingUp />,
      description: "Trending up this month",
      clarification: "Visitors for the last 6 months",
      percentage: 0,
      href: "/clients",
    },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {containers.map((container) => (
        <Card className="@container/card" key={container.label}>
          <CardHeader>
            <CardDescription>{container.label}</CardDescription>
            <Link href={container.href}>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {container.value}
              </CardTitle>
            </Link>
            <CardAction>
              <Badge variant="outline">
                {container.icon}
                {container.percentage}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {container.description} {container.icon}
            </div>
            <div className="text-muted-foreground">
              {container.clarification}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ClientSummary;
