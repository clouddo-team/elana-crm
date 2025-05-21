"use client";

import { Flex } from "@radix-ui/themes";
import ClientTable from "./ClientTable";
import ClientActions from "./list/ClientActions";

const ClientsPage = () => {
  return (
    <Flex direction="column" gap="3">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <ClientActions />
      <ClientTable />
    </Flex>
  );
};

export default ClientsPage;
