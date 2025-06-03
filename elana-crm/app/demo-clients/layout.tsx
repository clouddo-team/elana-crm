import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Clients",
  description: "Demo Clients",
};

export default function DemoClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
