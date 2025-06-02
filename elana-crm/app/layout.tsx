import "@radix-ui/themes/styles.css";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth/Provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <ThemeProvider defaultTheme="light">
          <Theme>
            <SidebarProvider
              style={
                {
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
            >
              <AppSidebar />

              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
            </Theme>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
