"use client";

import { useState } from "react";
import Button from "../common/Button";

const blankStudy = { id: "", title: "", site: "", phase: "Phase II", status: "Setup", enrolled: 0, target: 100, principalInvestigator: "", protocolVersion: "v1.0", startDate: "02 Oct 2026", nextMilestone: "Site activation" };

export default function StudyForm({ onSave, onCancel }) {
  const [form, setForm] = useState(blankStudy);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSave({ ...form, id: form.id.trim().toUpperCase(), enrolled: Number(form.enrolled), target: Number(form.target) });
  };
  return <form className="form-grid" onSubmit={submit}>
    <label>Study ID<input required value={form.id} onChange={(e) => update("id", e.target.value)} placeholder="AYU-CT-005" /></label>
    <label>Study title<input required value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Study title" /></label>
    <label>Primary site<input required value={form.site} onChange={(e) => update("site", e.target.value)} placeholder="Institution and city" /></label>
    <label>Principal investigator<input required value={form.principalInvestigator} onChange={(e) => update("principalInvestigator", e.target.value)} placeholder="Dr. Name" /></label>
    <label>Phase<select value={form.phase} onChange={(e) => update("phase", e.target.value)}><option>Phase I</option><option>Phase II</option><option>Phase III</option><option>Phase IV</option></select></label>
    <label>Status<select value={form.status} onChange={(e) => update("status", e.target.value)}><option>Setup</option><option>Recruiting</option><option>Monitoring</option></select></label>
    <label>Target enrollment<input type="number" min="1" required value={form.target} onChange={(e) => update("target", e.target.value)} /></label>
    <label>Initial enrolled<input type="number" min="0" required value={form.enrolled} onChange={(e) => update("enrolled", e.target.value)} /></label>
    <div className="form-actions"><Button variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit">Create study</Button></div>
  </form>;
}

