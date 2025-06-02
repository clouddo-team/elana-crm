import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
  description: "All customers registered in the platform",
};

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
