"use client";

import { DropdownMenu } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ClientSearchFilter from "../../components/ClientSearchFilter";
import { useDebounce } from "../utils/useDebounce";
import { Button } from "@/components/ui/button";

const ALL_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "country", label: "Country" },
  { key: "demo_validity", label: "Demo Validity" },
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
    const currentSearch = searchParams.get("search") || "";
    if (currentSearch !== debouncedSearch) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", debouncedSearch);
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }
  }, [debouncedSearch, router, searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex justify-between items-center gap-4 flex-wrap mb-4">
      <ClientSearchFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">Show Columns</Button>
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
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">Filter Platform 1</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {["all", "yes", "no"].map((value) => (
            <DropdownMenu.Item
              key={value}
              onSelect={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("egt", value);
                params.set("page", "1");
                router.push(`?${params.toString()}`);
              }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">Filter Platform 2</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {["all", "yes", "no"].map((value) => (
            <DropdownMenu.Item
              key={value}
              onSelect={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("bgt", value);
                params.set("page", "1");
                router.push(`?${params.toString()}`);
              }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">Filter Platform 3</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {["all", "yes", "no"].map((value) => (
            <DropdownMenu.Item
              key={value}
              onSelect={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("f359", value);
                params.set("page", "1");
                router.push(`?${params.toString()}`);
              }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default Filters;
