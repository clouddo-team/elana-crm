import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expired IDs",
  description: "Expired IDs",
};

export default function ExpiredIdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

