"use client";

import { Card, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DealChartData {
  date: string;
  count: number;
}

const LastDealsChart = () => {
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
        Deals in the Last 6 Months
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              const [year, month] = date.split("-");
              return `${month}/${year.slice(2)}`; // e.g., "04/24"
            }}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(date) => `Month: ${date}`}
            formatter={(value: number) => [`${value}`, "Deals"]}
          />
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

export default LastDealsChart;
