import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import Badge from "../common/Badge";

export default function StudyCard({ study }) {
  const percentage = Math.round((study.enrolled / study.target) * 100);
  return <article className="study-card">
    <div className="study-card-head"><span className="study-id">{study.id}</span><Badge>{study.status}</Badge></div>
    <h3>{study.title}</h3>
    <div className="study-card-details"><span>{study.site}</span><span>{study.phase}</span></div>
    <div className="progress-copy"><span><Users size={14} /> Enrollment</span><strong>{study.enrolled} / {study.target}</strong></div>
    <div className="progress-track"><span style={{ width: `${percentage}%` }} /></div>
    <Link href={`/studies/${study.id}`} className="inline-action">Open study <ArrowUpRight size={15} /></Link>
  </article>;
}

