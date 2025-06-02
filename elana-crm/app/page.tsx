import { Metadata } from "next";
import ClientSummary from "../components/ClientSummary";
import LastClientsChart from "../components/LastClientsChart";
import LastDealsChart from "../components/LastDealsChart";
import DemoClientSummary from "../components/DemoClientSummary";
import { SiteHeader } from "@/components/site-header";
import { ChartPieSimple } from "@/components/pie-chart-demo";

const breadcrumbItems = [
  { label: "Dashboard", description: "Elana trading's dashboard" },
];

export default async function Home() {
  return (
    <SiteHeader breadcrumbItems={breadcrumbItems}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Real Clients</h2>
      <ClientSummary />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
        <div className="w-full">
          <LastDealsChart />
        </div>
        <div className="w-full">
          <LastClientsChart />
        </div>
      </div>
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Demo Clients</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          <div className="w-full">
            <DemoClientSummary />
          </div>
          <div className="w-full">
            <ChartPieSimple />
          </div>
        </div>
      </div>
    </SiteHeader>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Elana - Dashboard",
  description: "Elana Dashboard",
};
