"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import React from "react";

interface Props {
  active: number;
  inactive: number;
  pending_payment: number;
}

const ClientChart = ({ active, inactive, pending_payment }: Props) => {
  const data = [
    { label: "Active", value: active },
    { label: "Inactive", value: inactive },
    { label: "Pending Payment", value: pending_payment },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ClientChart;
