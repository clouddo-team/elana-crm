"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

type PieDataItem = {
  name: string;
  value: number;
};

const chartConfig = {
  Platform1: {
    label: "Platform 1",
    color: "var(--chart-1)",
  },
  Platform2: {
    label: "Platform 2",
    color: "var(--chart-2)",
  },
  Platform3: {
    label: "Platform 3",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartPieSimple() {
  const [data, setData] = useState<PieDataItem[] | null>(null);

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

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart demo clients</CardTitle>
        <CardDescription>What does this chart show?</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data || []}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
              fill="var(--chart-1)"
            >
              {data?.map((entry, index) => {
                const platformKey = `Platform${index + 1}` as keyof typeof chartConfig;
                return <Cell key={`cell-${index}`} fill={chartConfig[platformKey].color} />;
              })}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          This is a demo pie chart <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
