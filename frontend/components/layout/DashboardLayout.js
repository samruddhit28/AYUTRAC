"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const section = pathname.split("/")[1] || "dashboard";
  return (
    <div className="app-shell">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="main-shell">
        <Header section={section} onMenu={() => setOpen(true)} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}

