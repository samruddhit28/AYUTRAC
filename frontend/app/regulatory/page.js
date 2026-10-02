"use client";

import { useState } from "react";
import { FilePlus2, FolderCheck, ShieldCheck } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";
import { deadlines as initialDeadlines } from "../../data/deadlines";

function DeadlineForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ title: "", owner: "Study Coordinator", due: "30 Oct 2026", status: "Pending", category: "CTRI", daysLeft: 28 });
  return <form className="form-grid" onSubmit={(e) => { e.preventDefault(); onSave({ ...form, id: `REG-${Date.now()}` }); }}>
    <label>Requirement<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. IEC continuing review" /></label><label>Owner<select value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })}><option>Study Coordinator</option><option>Ethics Committee</option><option>Principal Investigator</option><option>Pharmacovigilance</option></select></label>
    <label>Compliance layer<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>CTRI</option><option>IEC</option><option>NDCT</option><option>GCP</option></select></label><label>Due date<input required value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} placeholder="30 Oct 2026" /></label>
    <div className="form-actions"><Button variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit">Add deadline</Button></div>
  </form>;
}

const evidence = [
  { name: "IEC approval letter - AYU-CT-001", type: "Approval evidence", updated: "01 Oct 2026", state: "Verified" },
  { name: "CTRI registration acknowledgement", type: "Registration", updated: "29 Sep 2026", state: "Pending review" },
  { name: "Safety expedited report package", type: "Safety evidence", updated: "30 Sep 2026", state: "In review" },
];

export default function RegulatoryPage() {
  const [deadlines, setDeadlines] = useState(initialDeadlines);
  const [open, setOpen] = useState(false);
  return <DashboardLayout><section className="page-intro compact"><div><span className="eyebrow">Regulatory command</span><h1>Regulatory & compliance</h1><p>CTRI, IEC, NDCT, and GCP evidence connected to accountable due-date controls.</p></div><Button icon={FilePlus2} onClick={() => setOpen(true)}>Add deadline</Button></section>
    <section className="compliance-strip"><ShieldCheck size={20} /><span>Audit-ready controls: ownership, evidence, deadline status, and reviewer action are retained as a connected compliance record.</span></section>
    <section className="deadline-card-grid">{deadlines.map((deadline) => <article className={`deadline-card ${deadline.status === "Due Soon" ? "deadline-card-warning" : ""}`} key={deadline.id}><div><span className="deadline-category">{deadline.category}</span><Badge>{deadline.status}</Badge></div><h2>{deadline.title}</h2><p>{deadline.owner}</p><div className="deadline-bottom"><strong>{deadline.due}</strong><span>{deadline.daysLeft} days remaining</span></div></article>)}</section>
    <section className="dashboard-grid"><article className="panel"><div className="panel-heading"><div><span className="eyebrow">Evidence documents</span><h2>Compliance library</h2></div><FolderCheck size={21} className="heading-icon" /></div><div className="document-list">{evidence.map((document) => <div className="document-row" key={document.name}><div><strong>{document.name}</strong><span>{document.type} · Updated {document.updated}</span></div><Badge tone={document.state === "Verified" ? "success" : document.state === "In review" ? "warning" : "info"}>{document.state}</Badge></div>)}</div></article><article className="panel audit-panel"><div className="panel-heading"><div><span className="eyebrow">Audit trail</span><h2>Latest accountable actions</h2></div></div><div className="audit-item"><span className="audit-dot" /><div><strong>IEC evidence reviewed</strong><span>Ethics Committee · 01 Oct, 14:32</span></div></div><div className="audit-item"><span className="audit-dot" /><div><strong>CTRI deadline reassigned</strong><span>Research Coordinator · 01 Oct, 11:08</span></div></div><div className="audit-item"><span className="audit-dot" /><div><strong>Safety package attached</strong><span>Pharmacovigilance · 30 Sep, 17:45</span></div></div></article></section>
    <Modal open={open} onClose={() => setOpen(false)} title="Configure compliance deadline"><DeadlineForm onCancel={() => setOpen(false)} onSave={(deadline) => { setDeadlines((items) => [deadline, ...items]); setOpen(false); }} /></Modal>
  </DashboardLayout>;
}

