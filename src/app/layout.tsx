import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMS Platform | Parul University Clone",
  description: "Comprehensive Learning Management System",
};

/**
 * Provides the root HTML layout for the application and renders page content inside the document body.
 *
 * @param children - React nodes to be rendered inside the `<body>` of the document.
 * @returns The top-level HTML structure (`<html>` with `<body>`) wrapping `children`, with the Inter font class and base background/text styling applied.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f8f9fa] text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
