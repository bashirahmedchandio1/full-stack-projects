import React from "react";
import Header from "@/components/Header";
import Footers from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footers />
    </div>
  );
};

export default Layout;
