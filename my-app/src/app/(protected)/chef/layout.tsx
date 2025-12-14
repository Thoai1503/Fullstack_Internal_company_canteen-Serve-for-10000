import Sidebar from "@/components/admin/sidebar/SideBar";
import { AuthInitializer } from "@/components/auth/AuthInitializer";
import React from "react";

export default function ChefLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthInitializer>
      <div className="d-flex">
        <Sidebar />

        <div
          className="container mx-4 mt-3"
          style={{ height: "100vh", overflow: "auto" }}
        >
          {children}
        </div>
      </div>
    </AuthInitializer>
  );
}
