import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: "jay-neo's ToDo App",
      template: "%s - jay-neo's ToDo App",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
