"use client";

import { Card, Text } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";
import React, { useEffect, useState } from "react";

interface DealChartData {
  date: string;
  count: number;
}

const ClientChart = () => {
  const [data, setData] = useState<DealChartData[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch("/api/logs/by-date");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch deal chart data", err);
      }
    };

    fetchDeals();
  }, []);

  return (
    <Card>
      <Text size="3" weight="bold" mb="2">
        Deals in the Last 30 Days
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="count"
            barSize={40}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ClientChart;
