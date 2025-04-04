import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto min-h-screen min-w-screen flex items-center justify-center overflow-clip relative ">
      <div className="relative flex flex-col p-4 lg:w-1/3 z-10">{children}</div>
    </div>
  );
};

export default Layout;
