"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BarChart3, Building2, ClipboardCheck, FileBarChart, HeartPulse, LayoutDashboard, ShieldCheck, Users, X } from "lucide-react";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/studies", label: "Studies", icon: ClipboardCheck },
  { href: "/sites", label: "Sites", icon: Building2 },
  { href: "/participants", label: "Participants", icon: Users },
  { href: "/monitoring", label: "Monitoring", icon: BarChart3 },
  { href: "/safety", label: "Safety", icon: HeartPulse },
  { href: "/regulatory", label: "Regulatory", icon: ShieldCheck },
  { href: "/reports", label: "Reports", icon: FileBarChart },
];

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  return (
    <>
      {open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <Link href="/dashboard" className="brand" onClick={onClose}>
            <span className="brand-mark"><Activity size={20} /></span>
            <span>AYU<span>TRAC</span></span>
          </Link>
          <button className="icon-button sidebar-close" aria-label="Close navigation" title="Close navigation" onClick={onClose}><X size={18} /></button>
        </div>
        <p className="brand-subtitle">Clinical Trials Management</p>
        <nav className="side-nav" aria-label="Primary navigation">
          {navigation.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));
            return <Link key={href} href={href} onClick={onClose} className={`side-link ${active ? "side-link-active" : ""}`}><Icon size={18} /><span>{label}</span></Link>;
          })}
        </nav>
        <div className="privacy-panel">
          <ShieldCheck size={18} />
          <div><strong>Privacy by Default</strong><span>RBAC · Audit Trail · Encryption</span></div>
        </div>
        <div className="sidebar-user">
          <div className="avatar">RC</div>
          <div><strong>Research Coordinator</strong><span>STUDY_COORDINATOR</span></div>
        </div>
      </aside>
    </>
  );
}

