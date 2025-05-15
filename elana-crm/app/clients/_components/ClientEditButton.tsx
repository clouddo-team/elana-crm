import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Link } from "@radix-ui/themes";
import React from "react";

const ClientEditButton = ({ clientId }: { clientId: number }) => {
  return (
    <Button variant="soft" size="3">
      <Pencil2Icon />
      <Link href={`/clients/${clientId}/edit`}>Edit Client</Link>
    </Button>
  );
};

export default ClientEditButton;
