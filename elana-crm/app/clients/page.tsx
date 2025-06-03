"use client";

import { Flex } from "@radix-ui/themes";
import ClientTable from "./ClientTable";
import ClientActions from "./list/ClientActions";
import { SiteHeader } from "@/components/site-header";

const breadcrumbItems = [{ label: "Customers" }];

const ClientsPage = () => {
  return (
    <Flex direction="column" gap="3">
      <SiteHeader breadcrumbItems={breadcrumbItems}>
        <ClientActions />
        <ClientTable />
      </SiteHeader>
    </Flex>
  );
};

export default ClientsPage;
