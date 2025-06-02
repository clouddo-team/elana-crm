"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

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

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real Clients</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Real Clients</span>
          <span className="@[540px]/card:hidden">Created In The Last 6 Months</span>
        </CardDescription>
      </CardHeader>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="date"
            tickFormatter={(date) =>
              new Date(date + "-01").toLocaleString("default", {
                month: "short",
                year: "2-digit",
              })
            }
          />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`${value}`, "Clients"]}
            labelFormatter={(label) =>
              new Date(label + "-01").toLocaleString("default", {
                month: "long",
                year: "numeric",
              })
            }
          />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
