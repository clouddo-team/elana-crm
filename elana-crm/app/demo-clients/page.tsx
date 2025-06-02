"use client";

import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import DemoClientTable from "./DemoClientsTable";
import Filters from "./Filters";
import { SiteHeader } from "@/components/site-header";

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

const breadcrumbItems = [
  {
    label: "Demo Customers",
    description:
      "A demo list of custemers intended to showcase the features of the platform",
  },
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
      <SiteHeader breadcrumbItems={breadcrumbItems}>
        <Filters visibleColumns={visibleColumns} toggleColumn={toggleColumn} />
        <DemoClientTable visibleColumns={visibleColumns} />
      </SiteHeader>
    </Flex>
  );
}
