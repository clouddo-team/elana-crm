"use client";

import { Suspense } from "react";
import ClientTable from "./ClientTable";

export default function ClientTableWrapper() {
  return (
    <Suspense fallback={<div>Loading table...</div>}>
      <ClientTable />
    </Suspense>
  );
}
