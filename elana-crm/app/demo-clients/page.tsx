"use client";

import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import DemoClientTable from "./DemoClientsTable";
import Filters from "./Filters";

const DEFAULT_COLUMNS = [
  "name",
  "email",
  "phone",
  "country",
  "city",
  "language",
  "is_egt",
  "is_bgt",
  "is_f359",
];

export default function DemoClientsPage() {
  const [visibleColumns, setVisibleColumns] =
    useState<string[]>(DEFAULT_COLUMNS);

  const toggleColumn = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  return (
    <Flex direction="column" gap="3">
      <h1 className="text-2xl font-bold mb-4">Demo Clients</h1>
      <Filters visibleColumns={visibleColumns} toggleColumn={toggleColumn} />
      <DemoClientTable visibleColumns={visibleColumns} />
    </Flex>
  );
}
