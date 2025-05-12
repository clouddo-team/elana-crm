"use client";

import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import StatusFilter from "./StatusFilter";
import ClientSearchFilter from "../../components/ClientSearchFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "../../utils/useDebounce";

const ClientActions = () => {
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
    <Flex justify="between" align="center" gap="4">
      <StatusFilter />
      <ClientSearchFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <Button variant="soft" size="2" asChild>
        <Link href="/clients/new">Add New Client</Link>
      </Button>
    </Flex>
  );
};

export default ClientActions;
