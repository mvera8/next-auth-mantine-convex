import "@mantine/core/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import { Providers } from "@/components/Providers";
import React from "react";

export const metadata = {
  title: "My App",
  description: "Built with Next.js, NextAuth, Mantine and Convex",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
