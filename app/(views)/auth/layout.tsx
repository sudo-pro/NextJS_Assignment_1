import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto min-h-screen min-w-screen flex items-center justify-center overflow-clip relative">
      {children}
    </div>
  );
};

export default Layout;
