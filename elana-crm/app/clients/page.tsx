"use client";

import ClientActions from "./list/ClientActions";
import ClientTable from "./ClientTable";
import { Flex } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";

const ClientsPage = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  return (
    <Flex direction="column" gap="3">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <ClientActions />
      <ClientTable />
    </Flex>
  );
};

export default ClientsPage;
