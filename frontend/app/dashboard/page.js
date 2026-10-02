import { CalendarClock, ClipboardList, MessageSquareWarning, Users } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import KPIcard from "../../components/dashboard/KPIcard";
import StudyPortfolio from "../../components/dashboard/StudyPortfolio";
import RegulatoryClock from "../../components/dashboard/RegulatoryClock";
import SafetySignals from "../../components/dashboard/SafetySignals";
import ResearchWorkflow from "../../components/dashboard/ResearchWorkflow";
import { studies } from "../../data/studies";
import { deadlines } from "../../data/deadlines";
import { safetyEvents } from "../../data/safetyEvents";

export default function DashboardPage() {
  return <DashboardLayout>
    <section className="page-intro"><div><span className="eyebrow">Smart India Hackathon 2026 · SIH26046</span><h1>Clinical Research Command Center</h1><p>See what needs attention before it becomes a compliance or safety issue.</p></div><div className="live-status"><span className="live-dot" /> Live portfolio signals</div></section>
    <section className="kpi-grid">
      <KPIcard label="Active Studies" value="12" detail="+2 this quarter" icon={ClipboardList} />
      <KPIcard label="Participants" value="1,248" detail="84% of recruitment target" icon={Users} tone="navy" />
      <KPIcard label="Open Queries" value="37" detail="8 require monitor action" icon={MessageSquareWarning} tone="orange" />
      <KPIcard label="Upcoming Deadlines" value="09" detail="1 due within 10 days" icon={CalendarClock} tone="green" />
    </section>
    <section className="dashboard-grid"><StudyPortfolio studies={studies} /><RegulatoryClock deadlines={deadlines} /></section>
    <section className="dashboard-grid dashboard-grid-bottom"><ResearchWorkflow /><SafetySignals events={safetyEvents} /></section>
  </DashboardLayout>;
}

