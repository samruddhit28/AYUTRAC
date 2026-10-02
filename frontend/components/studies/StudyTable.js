"use client";

import { MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import Badge from "../common/Badge";

export default function StudyTable({ studies, onDelete }) {
  return <div className="table-wrap"><table className="data-table">
    <thead><tr><th>Study</th><th>Site</th><th>Phase</th><th>Status</th><th>Enrollment</th><th><span className="sr-only">Actions</span></th></tr></thead>
    <tbody>{studies.map((study) => {
      const percent = Math.round((study.enrolled / study.target) * 100);
      return <tr key={study.id}><td><Link href={`/studies/${study.id}`} className="table-title">{study.id}<span>{study.title}</span></Link></td><td>{study.site}</td><td>{study.phase}</td><td><Badge>{study.status}</Badge></td><td><div className="table-progress"><span>{study.enrolled}/{study.target}</span><div className="progress-track"><span style={{ width: `${percent}%` }} /></div></div></td><td><div className="row-actions"><Link className="icon-button" title="Open study" aria-label={`Open ${study.id}`} href={`/studies/${study.id}`}><MoreHorizontal size={18} /></Link><button className="icon-button danger-icon" title="Remove study" aria-label={`Remove ${study.id}`} onClick={() => onDelete(study)}><Trash2 size={17} /></button></div></td></tr>;
    })}</tbody>
  </table></div>;
}

