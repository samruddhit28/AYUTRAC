"use client";

import { useState } from "react";
import { ClipboardList, Plus, Siren } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import AECard from "../../components/safety/AECard";
import SAECard from "../../components/safety/SAECard";
import { safetyEvents as initialEvents } from "../../data/safetyEvents";

function SafetyForm({ type, onSubmit, onCancel }) {
  const [form, setForm] = useState({ id: type === "SAE" ? "SAE-0092" : "AE-1043", study: "AYU-CT-001", severity: type === "SAE" ? "Serious" : "Mild", narrative: "", onset: "02 Oct 2026" });
  return <form className="form-grid" onSubmit={(e) => { e.preventDefault(); onSubmit({ ...form, type, status: "Open" }); }}>
    <label>Event ID<input required value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value.toUpperCase() })} /></label><label>Study<select value={form.study} onChange={(e) => setForm({ ...form, study: e.target.value })}><option>AYU-CT-001</option><option>AYU-CT-002</option><option>AYU-CT-003</option></select></label>
    <label>Severity<select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })}>{type === "SAE" ? <option>Serious</option> : <><option>Mild</option><option>Moderate</option><option>Severe</option></>}</select></label><label className="wide-field">Clinical narrative<textarea required value={form.narrative} onChange={(e) => setForm({ ...form, narrative: e.target.value })} placeholder="Record the pseudonymous clinical event summary..." /></label>
    <div className="form-actions"><Button variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit">{type === "SAE" ? "Submit SAE" : "Submit AE"}</Button></div>
  </form>;
}

export default function SafetyPage() {
  const [events, setEvents] = useState(initialEvents);
  const [formType, setFormType] = useState(null);
  const [queueOpen, setQueueOpen] = useState(false);
  const openEvents = events.filter((event) => event.status === "Open");
  return <DashboardLayout><section className="page-intro compact"><div><span className="eyebrow">Safety surveillance</span><h1>Safety signals</h1><p>Human review stays at the center of the AE/SAE assessment and reporting workflow.</p></div><div className="button-row"><Button icon={Plus} onClick={() => setFormType("AE")}>Report adverse event</Button><Button icon={Siren} variant="danger" onClick={() => setFormType("SAE")}>Report serious adverse event</Button></div></section>
    <section className="safety-summary"><div><strong>{openEvents.length}</strong><span>Events awaiting review</span></div><div><strong>1</strong><span>Expedited report in progress</span></div><Button icon={ClipboardList} variant="secondary" onClick={() => setQueueOpen(true)}>Review safety queue</Button></section>
    <section className="event-grid"><div><div className="section-label"><span>Adverse events</span></div>{events.filter((event) => event.type === "AE").map((event) => <AECard key={event.id} event={event} />)}</div><div><div className="section-label serious-label"><span>Serious adverse events</span></div>{events.filter((event) => event.type === "SAE").map((event) => <SAECard key={event.id} event={event} />)}</div></section>
    <Modal open={Boolean(formType)} onClose={() => setFormType(null)} title={formType === "SAE" ? "Report serious adverse event" : "Report adverse event"}><SafetyForm type={formType} onCancel={() => setFormType(null)} onSubmit={(event) => { setEvents((items) => [event, ...items]); setFormType(null); }} /></Modal>
    <Modal open={queueOpen} onClose={() => setQueueOpen(false)} title="Safety review queue"><div className="review-queue">{openEvents.map((event) => <div className="signal-row" key={event.id}><div><strong>{event.id}</strong><span>{event.study} · {event.severity}</span></div><Button variant="secondary" onClick={() => { setEvents((items) => items.map((item) => item.id === event.id ? { ...item, status: "Resolved" } : item)); }}>Mark reviewed</Button></div>)}</div></Modal>
  </DashboardLayout>;
}

