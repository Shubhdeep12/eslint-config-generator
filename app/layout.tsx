import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainContent from "@/src/components/MainContent";
import Navbar from "@/src/components/Navbar";
import { DataProvider } from "@/src/containers/DataContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ESlint Generator",
  description: "Easily generate eslint for your app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <DataProvider>
            <Navbar />
            <MainContent>{children}</MainContent>
          </DataProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
