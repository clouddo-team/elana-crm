import { prisma } from "@/lib/prisma";
import ClientSummary from "./ClientSummary";
import LatestClient from "./LatestClient";
import ClientChart from "./ClientChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const active = await prisma.client.count({
    where: { status: "ACTIVE" },
  });
  const inactive = await prisma.client.count({
    where: { status: "INACTIVE" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <ClientSummary active={active} inactive={inactive} />
        <ClientChart active={active} inactive={inactive} />
      </Flex>
      <LatestClient />
    </Grid>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Elana - Dashboard",
  description: "Elana Dashboard",
};
