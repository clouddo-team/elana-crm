"use client";

import React, { Suspense } from "react";
import SearchableClientTable from "./SearchableClientTable";

const ClientWrapper = () => {
  return (
    <Suspense fallback={<div>Loading table...</div>}>
      <SearchableClientTable />
    </Suspense>
  );
};

export default ClientWrapper;
