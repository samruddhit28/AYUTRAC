import Link from "next/link";
import { ArrowDown, ArrowUpRight, ClipboardList, FileCheck2, HeartPulse, SearchCheck, UsersRound, Workflow } from "lucide-react";

const stages = [
  { title: "Study Setup", text: "Protocol, sites, roles & target", href: "/studies", icon: ClipboardList },
  { title: "Ethics + CTRI", text: "Approval, registration & due dates", href: "/regulatory", icon: FileCheck2 },
  { title: "Recruitment", text: "Screen → Enroll → Randomize", href: "/participants", icon: UsersRound },
  { title: "Monitoring", text: "Visits, deviations & data queries", href: "/monitoring", icon: SearchCheck },
  { title: "Safety", text: "AE / SAE → Coding → Timeline → Signal", href: "/safety", icon: HeartPulse },
  { title: "Close + Export", text: "Audit → SDTM / ADaM / Define-XML", href: "/reports", icon: Workflow },
];

export default function ResearchWorkflow() {
  return (
    <section className="panel workflow-panel">
      <div className="panel-heading"><div><span className="eyebrow">Trial digital thread</span><h2>Research workflow</h2></div></div>
      <div className="workflow-grid">
        {stages.map(({ title, text, href, icon: Icon }, index) => <div className="workflow-wrapper" key={title}>
          <Link href={href} className="workflow-step"><span className="workflow-icon"><Icon size={18} /></span><span><strong>{title}</strong><small>{text}</small></span><ArrowUpRight size={16} /></Link>
          {index < stages.length - 1 && <ArrowDown className="workflow-arrow" size={16} />}
        </div>)}
      </div>
    </section>
  );
}

