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
      <CardHeader>
        <CardTitle>Deals</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Deals</span>
          <span className="@[540px]/card:hidden">*what?closed?* in the Last 6 Months</span>
        </CardDescription>
      </CardHeader>
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
