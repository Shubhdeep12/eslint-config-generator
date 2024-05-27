import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/containers/DataContainer";
import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ESLint Config Generator",
  description: "Easily config your eslint config for your next app.",
  applicationName: "ESLint Config Generator",
  authors: [
    { name: "Shubhdeep Chhabra", url: "https://www.shubhdeepchhabra.in" },
  ],
  keywords: [
    "create eslint config in next.js",
    "create eslint config in react",
    "react",
    "next.js",
    "javascript",
    "ecmascript",
    "commonjs",
    "eslint",
    "linter",
    "linter in javascript app",
  ],
  referrer: "origin",
  creator: "Shubhdeep Chhabra",
  publisher: "Shubhdeep Chhabra",
  openGraph: {
    type: "website",
    description: "Easily config your eslint config for your next app.",
    title: "ESLint Config Generator",
    locale: "en_US",
    siteName: "ESLint Config Generator",
    url: "https://shubhdeep12.github.io/eslint-config-generator/",
    // images: [
    // 	{
    // 		url: '/assets/Shubhdeepchhabra.png',
    // 		alt: 'Shubhdeep Chhabra',
    // 		width: '1200',
    // 		height: '630',
    // 	},
    // ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@ShubhInTech",
    creator: "@ShubhInTech",
    title: "ESLint Config Generator",
    description: "Easily config your eslint config for your next app.",
    // images: ['/assets/Shubhdeepchhabra.png'],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon.png",
    },
  },
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
