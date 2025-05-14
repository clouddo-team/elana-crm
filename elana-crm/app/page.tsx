import LatestClient from "./LatestClient";
import ClientChart from "./ClientChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientSummary from "./ClientSummary";

export default async function Home() {
  const active = await prisma.client.count({
    where: { status: "ACTIVE" },
  });
  const inactive = await prisma.client.count({
    where: { status: "INACTIVE" },
  });

  return (
    <Flex direction="column" gap="10">
      {/* Upper Part - Real Clients */}
      <Flex direction="column" gap="5">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Real Clients</h2>
        <ClientSummary active={active} inactive={inactive} />
        <ClientChart />
      </Flex>

      {/* Lower Part - Demo Clients */}
      <Flex direction="column" gap="5">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Demo Clients</h2>
        <LatestClient />
      </Flex>
    </Flex>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Elana - Dashboard",
  description: "Elana Dashboard",
};
