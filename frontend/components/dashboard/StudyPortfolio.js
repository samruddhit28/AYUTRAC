import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import Badge from "../common/Badge";

export default function StudyPortfolio({ studies }) {
  return (
    <section className="panel portfolio-panel">
      <div className="panel-heading">
        <div><span className="eyebrow">Portfolio</span><h2>Study portfolio</h2></div>
        <Link href="/studies" className="text-link">View all <ArrowUpRight size={15} /></Link>
      </div>
      <div className="portfolio-list">
        {studies.slice(0, 3).map((study) => {
          const percentage = Math.round((study.enrolled / study.target) * 100);
          return <article key={study.id} className="portfolio-item">
            <div className="portfolio-top"><div><strong>{study.id}</strong><h3>{study.title}</h3></div><Badge>{study.status}</Badge></div>
            <div className="study-meta"><span>{study.site}</span><span>{study.phase}</span></div>
            <div className="progress-copy"><span><Users size={14} /> Enrollment</span><strong>{study.enrolled} / {study.target}</strong></div>
            <div className="progress-track"><span style={{ width: `${percentage}%` }} /></div>
            <Link href={`/studies/${study.id}`} className="inline-action">Open study <ArrowUpRight size={15} /></Link>
          </article>;
        })}
      </div>
    </section>
  );
}

