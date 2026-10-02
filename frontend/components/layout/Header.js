"use client";

import { Bell, Menu, ShieldCheck } from "lucide-react";

const labels = {
  dashboard: "Portfolio overview", studies: "Study operations", sites: "Site network", participants: "Participant registry",
  monitoring: "Monitoring center", safety: "Safety surveillance", regulatory: "Regulatory command", reports: "Reporting center",
};

export default function Header({ onMenu, section }) {
  return (
    <header className="app-header">
      <button className="icon-button mobile-menu" onClick={onMenu} aria-label="Open navigation" title="Open navigation"><Menu size={20} /></button>
      <div className="header-context"><span className="eyebrow">AYUTRAC / {labels[section] || "Workspace"}</span></div>
      <div className="header-actions">
        <span className="secure-indicator"><ShieldCheck size={15} /> Secure workspace</span>
        <button className="icon-button notification-button" aria-label="View 3 notifications" title="Notifications"><Bell size={19} /><span>3</span></button>
        <div className="header-avatar">RC</div>
      </div>
    </header>
  );
}

