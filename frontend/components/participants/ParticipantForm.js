"use client";

import { useState } from "react";
import Button from "../common/Button";

export default function ParticipantForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ id: "", study: "AYU-CT-001", site: "AIIA, New Delhi", screening: "Screened", enrollmentDate: "-", visit: "Baseline", status: "Active" });
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  return <form className="form-grid" onSubmit={(e) => { e.preventDefault(); onSave({ ...form, id: form.id.trim().toUpperCase() }); }}>
    <div className="form-note">Only pseudonymous participant identifiers are stored in this demo.</div>
    <label>Pseudonymous participant ID<input required value={form.id} onChange={(e) => update("id", e.target.value)} placeholder="P-AYU-00501" /></label>
    <label>Study<select value={form.study} onChange={(e) => update("study", e.target.value)}><option>AYU-CT-001</option><option>AYU-CT-002</option><option>AYU-CT-003</option><option>AYU-CT-004</option></select></label>
    <label>Site<input required value={form.site} onChange={(e) => update("site", e.target.value)} /></label>
    <label>Screening status<select value={form.screening} onChange={(e) => update("screening", e.target.value)}><option>Screened</option><option>Enrolled</option><option>Screen Failed</option></select></label>
    <label>Current visit<input required value={form.visit} onChange={(e) => update("visit", e.target.value)} /></label>
    <div className="form-actions"><Button variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit">Add participant</Button></div>
  </form>;
}

