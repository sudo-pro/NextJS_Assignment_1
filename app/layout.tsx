import type { Metadata } from "next";
import "./globals.css";
import Providers from "~/lib/providers";
import { Overpass } from "next/font/google";
import { Toaster } from "sonner";

const globalFont = Overpass({ weight: "400" });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: "jay-neo's Task Tracker",
      template: "%s - jay-neo's Task Tracker",
    },
  };
}

export default async ({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) => {
  return (
    <html lang="en">
      <body className={globalFont.className}>
        <Providers session={session}>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
};
