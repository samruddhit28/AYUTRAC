import { AlertTriangle, CheckCircle2, ClipboardCheck, FileWarning, MessageSquare } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import KPIcard from "../../components/dashboard/KPIcard";
import Badge from "../../components/common/Badge";

const quality = [
  { site: "AIIA, New Delhi", visits: 92, deviations: 2, queries: 8, quality: "Good" },
  { site: "KLE, Belagavi", visits: 86, deviations: 4, queries: 12, quality: "Watch" },
  { site: "NIA, Jaipur", visits: 71, deviations: 6, queries: 11, quality: "At Risk" },
  { site: "CCRAS, Bengaluru", visits: 95, deviations: 1, queries: 6, quality: "Good" },
];

export default function MonitoringPage() {
  return <DashboardLayout><section className="page-intro compact"><div><span className="eyebrow">Risk-based monitoring</span><h1>Monitoring center</h1><p>Focus review effort on site signals before they become data-quality or compliance issues.</p></div></section>
    <section className="kpi-grid"><KPIcard label="Visit Completion" value="87%" detail="Across active site network" icon={CheckCircle2} /><KPIcard label="Missing Visits" value="14" detail="5 approaching window close" icon={ClipboardCheck} tone="orange" /><KPIcard label="Protocol Deviations" value="13" detail="3 require PI assessment" icon={FileWarning} tone="navy" /><KPIcard label="Open Queries" value="37" detail="11 aged over 7 days" icon={MessageSquare} tone="green" /></section>
    <section className="dashboard-grid monitoring-grid"><article className="panel"><div className="panel-heading"><div><span className="eyebrow">Site performance</span><h2>Visit completion trend</h2></div></div><div className="bar-chart">{[64, 72, 68, 81, 77, 87].map((value, index) => <div className="bar-unit" key={index}><span style={{ height: `${value}%` }} /><small>W{index + 1}</small></div>)}</div></article><article className="panel risk-panel"><div className="panel-heading"><div><span className="eyebrow">Priority review</span><h2>Risk signals</h2></div></div><div className="risk-row"><AlertTriangle size={19} /><div><strong>NIA, Jaipur</strong><span>6 protocol deviations require triage</span></div><Badge tone="danger">At Risk</Badge></div><div className="risk-row"><AlertTriangle size={19} /><div><strong>KLE, Belagavi</strong><span>4 missing visit windows this week</span></div><Badge tone="warning">Watch</Badge></div></article></section>
    <section className="panel table-panel"><div className="panel-heading"><div><span className="eyebrow">Data quality</span><h2>Site review queue</h2></div></div><div className="table-wrap"><table className="data-table"><thead><tr><th>Site</th><th>Visit completion</th><th>Deviations</th><th>Open queries</th><th>Quality signal</th></tr></thead><tbody>{quality.map((item) => <tr key={item.site}><td className="table-title">{item.site}<span>Weekly monitoring snapshot</span></td><td><div className="table-progress"><span>{item.visits}%</span><div className="progress-track"><span style={{ width: `${item.visits}%` }} /></div></div></td><td>{item.deviations}</td><td>{item.queries}</td><td><Badge tone={item.quality === "At Risk" ? "danger" : item.quality === "Watch" ? "warning" : "success"}>{item.quality}</Badge></td></tr>)}</tbody></table></div></section>
  </DashboardLayout>;
}

