import Sidebar from "@/components/admin/sidebar/SideBar";
import { cookies } from "next/headers";
import React from "react";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  console.log("Role admin area: " + role);
  return (
    <div className="d-flex">
      <Sidebar role={role?.toString()!} />

      <div className="container mx-4 mt-3" style={{ height: "100vh" }}>
        {children}
      </div>
    </div>
  );
}
