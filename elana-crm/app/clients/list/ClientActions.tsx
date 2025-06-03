"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import StatusFilter from "./StatusFilter";
import ClientSearchFilter from "@/components/ClientSearchFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "../../utils/useDebounce";
import { Button } from "@/components/ui/button";

const ClientActions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("search") !== debouncedSearch) {
      params.set("search", debouncedSearch);
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }
  }, [debouncedSearch, router, searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 w-full justify-between mb-4">
      <div className="flex items-center gap-2">
        <StatusFilter />
        <ClientSearchFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </div>

      <div className="justify-self-end">
        <Button variant="outline" asChild>
          <Link href="/clients/new">Add new client</Link>
        </Button>
      </div>
    </div>
  );
};

export default ClientActions;
