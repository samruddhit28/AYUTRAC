"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, FileCheck2, MapPin, Users } from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import { studies, studyTabs } from "../../../data/studies";

const tabContent = {
  Overview: "Portfolio information, enrollment progress, protocol ownership, and the next milestone are visible to approved research roles.",
  Protocol: "Protocol v2.1 is controlled with a review-ready version history. Changes require principal investigator approval.",
  Sites: "Site activation, staff delegation, and training readiness are tracked through the study digital thread.",
  Participants: "Participant records use pseudonymous study identifiers. Personally identifiable data is outside this CTMS view.",
  Visits: "Visit schedules, expected windows, and missing visit signals are ready for monitor review.",
  Monitoring: "Monitoring findings are triaged by site, severity, and target due date.",
  Safety: "AE and SAE reports link to an accountable clinician review workflow and regulatory timelines.",
  Queries: "Data queries are assigned, time-bound, and visible only to roles with the required access.",
  Regulatory: "CTRI, IEC, NDCT, and GCP evidence are maintained with ownership and due-date controls.",
  "Audit Log": "Every critical create, update, review, export, and approval action is designed to retain actor, timestamp, and value history.",
  Reports: "Generate study progress, safety, compliance, and data-quality views for an audit-ready handoff.",
};

export default function StudyDetailPage({ params }) {
  const study = studies.find((record) => record.id === params.studyId) || studies[0];
  const [tab, setTab] = useState("Overview");
  const progress = Math.round((study.enrolled / study.target) * 100);
  return <DashboardLayout><Link href="/studies" className="back-link"><ArrowLeft size={16} /> Studies</Link><section className="detail-hero"><div><span className="study-id">{study.id}</span><h1>{study.title}</h1><div className="detail-meta"><span><MapPin size={15} /> {study.site}</span><span>{study.phase}</span><Badge>{study.status}</Badge></div></div><Button icon={Download} variant="secondary">Study export</Button></section>
    <section className="detail-stat-grid"><div className="detail-stat"><span>Enrollment</span><strong>{study.enrolled} / {study.target}</strong><div className="progress-track"><span style={{ width: `${progress}%` }} /></div></div><div className="detail-stat"><span>Principal investigator</span><strong>{study.principalInvestigator}</strong><small>Protocol {study.protocolVersion}</small></div><div className="detail-stat"><span>Next milestone</span><strong>{study.nextMilestone}</strong><small>Study start: {study.startDate}</small></div></section>
    <div className="tab-list" role="tablist" aria-label="Study detail tabs">{studyTabs.map((item) => <button role="tab" aria-selected={tab === item} className={tab === item ? "tab-active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}</div>
    <section className="panel detail-tab-panel"><div className="tab-icon">{tab === "Overview" ? <Users size={21} /> : <FileCheck2 size={21} />}</div><div><span className="eyebrow">{tab}</span><h2>{tab} workspace</h2><p>{tabContent[tab]}</p></div></section>
  </DashboardLayout>;
}

