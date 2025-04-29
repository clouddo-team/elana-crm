"use client";

import React, { Suspense } from "react";
import ClientActions from "./list/ClientActions";
import SearchableClientTable from "./SearchableClientTable";
import { Flex } from "@radix-ui/themes";

const ClientPageWrapper = () => {
  return (
    <Flex direction="column" gap="3">
      <Suspense fallback={<div>Loading actions...</div>}>
        <ClientActions />
      </Suspense>
      <Suspense fallback={<div>Loading table...</div>}>
        <SearchableClientTable />
      </Suspense>
    </Flex>
  );
};

export default ClientPageWrapper;
