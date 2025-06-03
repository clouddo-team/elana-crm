"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

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

  const chartConfig = {
    deals: {
      label: "Deals",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deals</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Deals</span>
          <span className="@[540px]/card:hidden">
            Closed in the last 6 months
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickMargin={10}
              axisLine={false}
              tickFormatter={(date) => {
                const [year, month] = date.split("-");
                return `${month}/${year.slice(2)}`; // e.g., "04/24"
              }}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              labelFormatter={(date) => `Month: ${date}`}
              formatter={(value: number) => [`${value}`, "Deals"]}
            />
            <Bar
              dataKey="count"
              radius={8}
              style={{ fill: "var(--accent-9)" }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LastDealsChart;
