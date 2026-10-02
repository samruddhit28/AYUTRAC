"use client";

import { useMemo, useState } from "react";
import { Filter, Plus } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import SearchBar from "../../components/common/SearchBar";
import StudyTable from "../../components/studies/StudyTable";
import StudyCard from "../../components/studies/StudyCard";
import StudyForm from "../../components/studies/StudyForm";
import { studies as initialStudies, studyPhases, studyStatuses } from "../../data/studies";

export default function StudiesPage() {
  const [records, setRecords] = useState(initialStudies);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [phase, setPhase] = useState("All phases");
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const filtered = useMemo(() => records.filter((study) => (status === "All statuses" || study.status === status) && (phase === "All phases" || study.phase === phase) && `${study.id} ${study.title} ${study.site}`.toLowerCase().includes(search.toLowerCase())), [records, search, status, phase]);
  return <DashboardLayout><section className="page-intro compact"><div><span className="eyebrow">Study operations</span><h1>Studies</h1><p>Manage protocols, study sites, enrollment, and research milestones.</p></div><Button icon={Plus} onClick={() => setCreateOpen(true)}>Add new study</Button></section>
    <section className="toolbar panel"><SearchBar value={search} onChange={setSearch} placeholder="Search ID, title or site" /><div className="filter-group"><Filter size={16} /><select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}>{studyStatuses.map((option) => <option key={option}>{option}</option>)}</select><select aria-label="Filter by phase" value={phase} onChange={(e) => setPhase(e.target.value)}>{studyPhases.map((option) => <option key={option}>{option}</option>)}</select></div></section>
    <div className="study-card-grid">{filtered.map((study) => <StudyCard study={study} key={study.id} />)}</div>
    <section className="panel table-panel"><div className="panel-heading"><div><span className="eyebrow">Portfolio register</span><h2>{filtered.length} studies shown</h2></div></div><StudyTable studies={filtered} onDelete={setDeleteTarget} /></section>
    <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Add new study"><StudyForm onCancel={() => setCreateOpen(false)} onSave={(study) => { setRecords((items) => [study, ...items]); setCreateOpen(false); }} /></Modal>
    <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Remove study" footer={<><Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button><Button variant="danger" onClick={() => { setRecords((items) => items.filter((item) => item.id !== deleteTarget.id)); setDeleteTarget(null); }}>Remove study</Button></>}><p>Remove <strong>{deleteTarget?.id}</strong> from this local demonstration portfolio? This action is recorded in the production audit trail.</p></Modal>
  </DashboardLayout>;
}

