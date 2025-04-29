// import React from "react";
// import { prisma } from "@/lib/prisma";
// import { Flex, Heading } from "@radix-ui/themes";
// import ClientLogs from "./ClientLogs";

// interface Props {
//   params: Promise<{ id: string }>;
// }

// const ClientLogPage = async ({ params }: Props) => {
//   const resolvedParams = await params;
//   const log = await prisma.clientlog.findMany({
//     where: { clientId: parseInt(resolvedParams.id) },
//     orderBy: { log_created: "asc" },
//   });

//   const clientId = parseInt(resolvedParams.id);

//   return (
//     <Flex direction="column" align="center" justify="center" gap="4">
//       <Heading>Logs for Client {resolvedParams.id}</Heading>
//       <ClientLogs initialLogs={log} clientId={clientId} />
//     </Flex>
//   );
// };

// export default ClientLogPage; 

import React from "react";
import ClientActions from "./list/ClientActions";
import ClientTable from "./ClientTable";
import { Flex } from "@radix-ui/themes";
import { Suspense } from "react";

const ClientsPage = () => {
  return (
    <Flex direction="column" gap="3">
      <Suspense fallback={<div>Loading actions...</div>}>
        <ClientActions />
      </Suspense>
      <ClientTable />
    </Flex>
  );
};

export default ClientsPage;