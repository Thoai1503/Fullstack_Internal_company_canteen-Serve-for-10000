import Sidebar from "@/components/admin/sidebar/SideBar";
import React from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container mx-4 mt-3" style={{ height: "100vh" }}>
        {children}
      </div>
    </div>
  );
}
