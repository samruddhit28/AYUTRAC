"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, FileText, Play } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";

const reports = [
  { title: "Study Progress", description: "Enrollment, milestones, site readiness, and visit completion.", frequency: "Weekly" },
  { title: "Recruitment Report", description: "Screening funnel and enrollment performance by site.", frequency: "Weekly" },
  { title: "Safety Report", description: "AE/SAE line listing, review status, and safety signals.", frequency: "On demand" },
  { title: "Regulatory Compliance", description: "Deadline status, evidence readiness, and audit actions.", frequency: "Weekly" },
  { title: "Site Performance", description: "Visit completion, monitoring findings, and query aging.", frequency: "Monthly" },
  { title: "Data Quality", description: "Queries, deviations, missing visits, and quality signals.", frequency: "Weekly" },
];

export default function ReportsPage() {
  const [generated, setGenerated] = useState("");
  const exportCsv = (title) => {
    const content = "report,generated_at,status\n" + `"${title}","${new Date().toISOString()}","Generated"`;
    const blob = new Blob([content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replaceAll(" ", "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setGenerated(`${title} CSV export downloaded.`);
  };
  return <DashboardLayout><section className="page-intro compact"><div><span className="eyebrow">Audit-ready outputs</span><h1>Reports</h1><p>Generate portfolio reporting with controlled exports for review, submission, and leadership decisions.</p></div></section>
    {generated && <div className="success-notice"><Download size={17} /> {generated}</div>}
    <section className="report-grid">{reports.map((report) => <article className="report-card" key={report.title}><div className="report-card-top"><div className="report-icon"><FileText size={21} /></div><Badge tone="info">{report.frequency}</Badge></div><h2>{report.title}</h2><p>{report.description}</p><div className="report-actions"><Button icon={Play} onClick={() => setGenerated(`${report.title} generated and ready for review.`)}>Generate report</Button><button className="icon-button" title="Export CSV" aria-label={`Export ${report.title} CSV`} onClick={() => exportCsv(report.title)}><FileSpreadsheet size={18} /></button><button className="icon-button" title="Export PDF" aria-label={`Print ${report.title} as PDF`} onClick={() => { setGenerated(`${report.title} prepared for PDF printing.`); window.print(); }}><Download size={18} /></button></div></article>)}</section>
  </DashboardLayout>;
}

