import ClientActions from "./list/ClientActions";
import ClientTable from "./ClientTable";
import { Flex } from "@radix-ui/themes";
const ClientsPage = () => {
  return (
    <Flex direction="column" gap="3">
      <ClientActions />
      <ClientTable />
    </Flex>
  );
};

export default ClientsPage;
