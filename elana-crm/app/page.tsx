import { Box, Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import ClientSummary from "../components/ClientSummary";
import LastClientsChart from "../components/LastClientsChart";
import LastDealsChart from "../components/LastDealsChart";
import DemoClientSummary from "../components/DemoClientSummary";
import DemoClientPieChart from "../components/DemoClientPieChart";

export default async function Home() {
  return (
    <Flex direction="column" gap="10">
      <Flex direction="column" gap="5" style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Real Clients</h2>
        <ClientSummary />
        <Flex direction="row" gap="4" justify="center" align="center">
          <Box width="50%">
            <LastDealsChart />
          </Box>
          <Box width="50%">
            <LastClientsChart />
          </Box>
        </Flex>
      </Flex>
      <Flex direction="column" gap="5" mt="10">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Demo Clients</h2>
        <Flex direction="row" gap="2" align="center" justify="center">
          <DemoClientSummary />
          <Flex justify="center" align="center">
            <DemoClientPieChart />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Elana - Dashboard",
  description: "Elana Dashboard",
};
