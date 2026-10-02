"use client";

import { useMemo, useState } from "react";
import { Plus, ShieldCheck } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import SearchBar from "../../components/common/SearchBar";
import ParticipantTable from "../../components/participants/ParticipantTable";
import ParticipantForm from "../../components/participants/ParticipantForm";
import { participants as initialParticipants } from "../../data/participants";

export default function ParticipantsPage() {
  const [records, setRecords] = useState(initialParticipants);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = useMemo(() => records.filter((person) => Object.values(person).join(" ").toLowerCase().includes(search.toLowerCase())), [records, search]);
  return <DashboardLayout><section className="page-intro compact"><div><span className="eyebrow">Privacy-preserving registry</span><h1>Participants</h1><p>Operational study records use pseudonymous identifiers only.</p></div><Button icon={Plus} onClick={() => setOpen(true)}>Add participant</Button></section>
    <div className="privacy-callout"><ShieldCheck size={19} /><span>Privacy by default: no names, contact details, or direct identifiers are exposed in this CTMS workspace.</span></div>
    <section className="panel table-panel"><div className="toolbar-inner"><SearchBar value={search} onChange={setSearch} placeholder="Search pseudonymous ID, study or site" /><span className="result-count">{filtered.length} records</span></div><ParticipantTable participants={filtered} /></section>
    <Modal open={open} onClose={() => setOpen(false)} title="Add participant record"><ParticipantForm onCancel={() => setOpen(false)} onSave={(participant) => { setRecords((items) => [participant, ...items]); setOpen(false); }} /></Modal>
  </DashboardLayout>;
}

