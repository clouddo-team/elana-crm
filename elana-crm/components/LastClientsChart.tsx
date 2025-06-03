"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

interface ClientsByMonth {
  date: string;
  count: number;
}

export default function LastClientsChart() {
  const [data, setData] = useState<ClientsByMonth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch("/api/clients/last_6_months");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load clients chart data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  const chartConfig = {
    clients: {
      label: "Real clients",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real clients</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Real Clients</span>
          <span className="@[540px]/card:hidden">
            Created in the last 6 months
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickMargin={10}
              axisLine={false}
              tickFormatter={(date) =>
                new Date(date + "-01").toLocaleString("default", {
                  month: "short",
                  year: "2-digit",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              labelFormatter={(label) =>
                new Date(label + "-01").toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })
              }
            />
            <Bar dataKey="count" fill="var(--accent-9)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
