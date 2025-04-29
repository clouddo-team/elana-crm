import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button, Link } from '@radix-ui/themes';
import React from 'react'

const ClientEditButton = ({clientId}:{clientId:number}) => {
  return (
        <Button>
          <Pencil2Icon />
          <Link href={`/clients/${clientId}/edit`}>Edit Issue</Link>
        </Button>
  );
}

export default ClientEditButton