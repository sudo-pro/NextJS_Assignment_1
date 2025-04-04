import type { Metadata } from "next";
import "./globals.css";
import Providers from "~/lib/providers";
import { Overpass } from "next/font/google";
import { Toaster } from "sonner";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "~/lib/authOption";

const globalFont = Overpass({ weight: "400", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: "jay-neo's Task Tracker",
      template: "%s - jay-neo's Task Tracker",
    },
  };
}

export default async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={globalFont.className}>
        <Providers session={session as Session}>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
};
