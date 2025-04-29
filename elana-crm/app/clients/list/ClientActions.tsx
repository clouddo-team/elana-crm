import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusFilter from "./StatusFilter";

const ClientActions = () => {
  return (
    <Flex justify="between">
      <StatusFilter />
      <Button>
        <Link href="/clients/new">New Client</Link>
      </Button>
    </Flex>
  );
};

export default ClientActions;
