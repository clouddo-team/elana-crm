"use client";

import { Button, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ClientSearchFilter from "../components/ClientSearchFilter";
import { useDebounce } from "../utils/useDebounce";

const ALL_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "country", label: "Country" },
  { key: "city", label: "City" },
  { key: "language", label: "Language" },
  { key: "is_egt", label: "EGT" },
  { key: "is_bgt", label: "BGT" },
  { key: "is_f359", label: "F359" },
];

const Filters = ({
  visibleColumns,
  toggleColumn,
}: {
  visibleColumns: string[];
  toggleColumn: (column: string) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", debouncedSearch);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Flex justify="between" align="center" gap="4" wrap="wrap">
      <ClientSearchFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline" size="3" mb="4">
            Show Columns
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {ALL_COLUMNS.map((col) => (
            <DropdownMenu.CheckboxItem
              key={col.key}
              checked={visibleColumns.includes(col.key)}
              onCheckedChange={() => toggleColumn(col.key)}
            >
              {col.label}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};

export default Filters;
