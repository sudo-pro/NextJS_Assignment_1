import React from "react";
import NavBar from "~/components/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="sticky container mx-auto min-h-screen">
      <div className="sticky top-0 z-30 h-[4rem] max-w-[1600px] items-center justify-between bg-gray-dark-0 px-2xl py-lg">
        <NavBar />
      </div>
      <main className="min-h-[40rem] flex items-center justify-center overflow-clip relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;
