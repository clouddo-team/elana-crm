"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

type PieDataItem = {
  name: string;
  value: number;
};

export default function DemoClientPieChart() {
  const [data, setData] = useState<PieDataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/demo-clients/piechart");
      const result = await res.json();
      const { total, egt, bgt, f359 } = result;

      if (total > 0) {
        setData([
          { name: "Platform 1", value: egt },
          { name: "Platform 2", value: bgt },
          { name: "Platform 3", value: f359 },
        ]);
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) return <p>No data to display.</p>;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Demo Clients</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Example description of what this chart is about
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
      </CardHeader>
      <div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 10, bottom: 40, left: 10 }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={180}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              wrapperStyle={{ paddingTop: "20px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
