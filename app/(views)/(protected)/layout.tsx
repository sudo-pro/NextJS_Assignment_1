import React from "react";
import { NavBar } from "~/components/NavBar";

export default async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="sticky container mx-auto min-h-screen">
      <div className="sticky top-0 z-30 mx-auto h-[4rem] w-[90%] max-w-[1600px] items-center justify-between">
        <NavBar />
      </div>
      <main className="min-h-[40rem] flex items-center justify-center overflow-clip relative">
        {children}
      </main>
    </div>
  );
};
