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
      icon: <TrendingUp />,
      description: "Demo clients expired",
      clarification: "Last 30 days",
      percentage: 0,
      href: "/demo_clients",
    },
    {
      label: "Demo Validity Expired MTD",
      value: expiredMTD,
      icon: <TrendingUp />,
      description: "Demo clients expired",
      clarification: "Month to date",
      percentage: 0,
      href: "/demo_clients",
    },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 ">
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

export default DemoClientSummary;
