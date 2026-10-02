import { Building2, CircleAlert, UsersRound } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Badge from "../../components/common/Badge";

const sites = [
  { name: "AIIA, New Delhi", code: "AIIA-01", studies: 3, participants: 344, completion: 92, status: "Active", issue: "2 open queries" },
  { name: "KLE Ayurveda Hospital, Belagavi", code: "KLE-02", studies: 2, participants: 261, completion: 86, status: "Active", issue: "1 monitoring finding" },
  { name: "National Institute of Ayurveda, Jaipur", code: "NIA-03", studies: 2, participants: 187, completion: 71, status: "Active", issue: "Training due" },
  { name: "CCRAS, Bengaluru", code: "CCRAS-04", studies: 2, participants: 156, completion: 95, status: "Active", issue: "No priority issues" },
];

export default function SitesPage() {
  return <DashboardLayout><section className="page-intro compact"><div><span className="eyebrow">Site network</span><h1>Research sites</h1><p>Activation, enrollment readiness, and quality signals across the research network.</p></div></section>
    <section className="site-grid">{sites.map((site) => <article className="site-card" key={site.code}><div className="site-card-head"><div className="site-icon"><Building2 size={20} /></div><Badge>{site.status}</Badge></div><h2>{site.name}</h2><span className="site-code">{site.code}</span><div className="site-metrics"><span><UsersRound size={15} /> {site.participants} participants</span><span>{site.studies} active studies</span></div><div className="progress-copy"><span>Visit completion</span><strong>{site.completion}%</strong></div><div className="progress-track"><span style={{ width: `${site.completion}%` }} /></div><div className="site-issue"><CircleAlert size={15} /> {site.issue}</div></article>)}</section>
  </DashboardLayout>;
}

